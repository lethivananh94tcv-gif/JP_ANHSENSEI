import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";

const PRIMARY_DATA_FILE = path.join(process.cwd(), "src", "app", "data", "server_admin_exams.json");
const SCRATCH_DATA_FILE = path.join(process.cwd(), "..", "scratch", "server_admin_exams.json");
const FALLBACK_TMP_FILE = path.join(os.tmpdir(), "anhsensei_server_admin_exams.json");

interface ServerExamsPayload {
  exams: any[];
  deletedIds: string[];
  updatedAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __ANHSENSEI_EXAMS_STORE__: ServerExamsPayload | undefined;
}

async function readServerStore(): Promise<ServerExamsPayload | null> {
  if (globalThis.__ANHSENSEI_EXAMS_STORE__ && Array.isArray(globalThis.__ANHSENSEI_EXAMS_STORE__.exams)) {
    return globalThis.__ANHSENSEI_EXAMS_STORE__;
  }

  for (const filePath of [PRIMARY_DATA_FILE, SCRATCH_DATA_FILE, FALLBACK_TMP_FILE]) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      if (!raw || !raw.trim()) continue;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.exams)) {
        const store: ServerExamsPayload = {
          exams: parsed.exams,
          deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
          updatedAt: parsed.updatedAt || Date.now(),
        };
        globalThis.__ANHSENSEI_EXAMS_STORE__ = store;
        return store;
      }
    } catch {
      // Try next candidate
    }
  }
  return null;
}

async function writeServerStore(payload: ServerExamsPayload): Promise<void> {
  globalThis.__ANHSENSEI_EXAMS_STORE__ = payload;
  const serialized = JSON.stringify(payload, null, 2);

  for (const targetFile of [PRIMARY_DATA_FILE, SCRATCH_DATA_FILE, FALLBACK_TMP_FILE]) {
    try {
      const dir = path.dirname(targetFile);
      await fs.mkdir(dir, { recursive: true });
      const tmpFile = `${targetFile}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
      await fs.writeFile(tmpFile, serialized, "utf-8");
      await fs.rename(tmpFile, targetFile);
      break;
    } catch {
      // Fallback to next path
    }
  }
}

export async function GET() {
  try {
    const store = await readServerStore();
    if (!store || store.exams.length === 0) {
      return NextResponse.json(
        { initialized: false, exams: [], deletedIds: [], updatedAt: 0 },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
    }
    return NextResponse.json(
      {
        initialized: true,
        exams: store.exams,
        deletedIds: store.deletedIds,
        updatedAt: store.updatedAt,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to read exams store" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body?.reset === true) {
      globalThis.__ANHSENSEI_EXAMS_STORE__ = undefined;
      try {
        await fs.unlink(SCRATCH_DATA_FILE);
      } catch {}
      try {
        await fs.unlink(FALLBACK_TMP_FILE);
      } catch {}
      return NextResponse.json({ success: true, reset: true });
    }

    const existing = await readServerStore();
    const incomingExams = Array.isArray(body?.exams) ? body.exams : [];
    const incomingDeleted: string[] = Array.isArray(body?.deletedIds)
      ? body.deletedIds.map((d: any) => String(d).trim().toLowerCase())
      : existing?.deletedIds || [];

    // Merge incoming exams with any custom server exams that weren't explicitly deleted
    const deletedSet = new Set(incomingDeleted);
    const mergedMap = new Map<string, any>();

    for (const ex of incomingExams) {
      if (!ex) continue;
      const id = String(ex.id || "").trim().toLowerCase();
      const code = String(ex.examCode || "").trim().toLowerCase();
      if (deletedSet.has(id) || deletedSet.has(code)) continue;
      mergedMap.set(id || code, ex);
    }

    if (existing && Array.isArray(existing.exams) && !body?.authoritativeOverwrite) {
      for (const oldEx of existing.exams) {
        if (!oldEx) continue;
        const id = String(oldEx.id || "").trim().toLowerCase();
        const code = String(oldEx.examCode || "").trim().toLowerCase();
        if (deletedSet.has(id) || deletedSet.has(code)) continue;
        const alreadyHas = Array.from(mergedMap.values()).some(
          (m) =>
            String(m.id || "").trim().toLowerCase() === id ||
            String(m.examCode || "").trim().toLowerCase() === code
        );
        if (!alreadyHas) {
          mergedMap.set(id || code, oldEx);
        }
      }
    }

    const finalExams = Array.from(mergedMap.values());
    const payload: ServerExamsPayload = {
      exams: finalExams,
      deletedIds: Array.from(deletedSet),
      updatedAt: Date.now(),
    };

    await writeServerStore(payload);

    return NextResponse.json({
      success: true,
      count: finalExams.length,
      updatedAt: payload.updatedAt,
    });
  } catch (error: any) {
    console.error("[API jlpt-exams] Error saving exams:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save exams store" },
      { status: 500 }
    );
  }
}
