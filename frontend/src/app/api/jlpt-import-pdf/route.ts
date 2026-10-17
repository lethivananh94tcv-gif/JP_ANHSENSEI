import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { spawn } from "child_process";

export const maxDuration = 180; // Allow long running OCR task

export async function POST(req: NextRequest) {
  let tempFilePath = "";
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Vui lòng chọn file PDF để bóc tách." }, { status: 400 });
    }

    const origName = file.name || "de_thi.pdf";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. First Attempt: Forward to Spring Boot Backend
    try {
      const backendFormData = new FormData();
      const blob = new Blob([buffer], { type: "application/pdf" });
      backendFormData.append("file", blob, origName);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const backendRes = await fetch("http://localhost:8080/api/v1/jlpt/exams/import-pdf", {
        method: "POST",
        body: backendFormData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const data = await backendRes.json();
        if (data && data.questions && data.questions.length > 0) {
          return NextResponse.json(data);
        }
      }
    } catch (backendErr) {
      console.warn("[API Import Proxy] Backend Spring Boot error, falling back to direct Python runner:", backendErr);
    }

    // 2. Second Attempt: Run Universal Python Parser directly
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, `jlpt_upload_${Date.now()}_${origName.replace(/[^a-zA-Z0-9_\.-]/g, "_")}`);
    await fs.writeFile(tempFilePath, buffer);

    const scriptPath = path.join(process.cwd(), "..", "scripts", "universal_jlpt_parser.py");
    const resolvedScript = (await fs.stat(scriptPath).catch(() => null))
      ? scriptPath
      : path.join(process.cwd(), "scripts", "universal_jlpt_parser.py");

    const pythonProcess = spawn("python", [resolvedScript, tempFilePath, origName]);

    let stdoutData = "";
    let stderrData = "";

    pythonProcess.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    const exitCode = await new Promise<number>((resolve) => {
      pythonProcess.on("close", resolve);
    });

    if (exitCode !== 0) {
      throw new Error(`Python script exited with code ${exitCode}: ${stderrData}`);
    }

    let jsonOutput = stdoutData.trim();
    const startMarker = jsonOutput.indexOf("===JSON_START===");
    const endMarker = jsonOutput.indexOf("===JSON_END===");
    if (startMarker >= 0 && endMarker > startMarker) {
      jsonOutput = jsonOutput.substring(startMarker + "===JSON_START===".length, endMarker).trim();
    } else {
      const jsonStart = jsonOutput.indexOf("{");
      const jsonEnd = jsonOutput.lastIndexOf("}");
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        jsonOutput = jsonOutput.substring(jsonStart, jsonEnd + 1);
      }
    }

    const parsedData = JSON.parse(jsonOutput);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("[API Import Proxy] Error parsing PDF:", error);
    return NextResponse.json(
      { error: `Lỗi bóc tách PDF: ${error.message || "Không thể phân tích file"}` },
      { status: 500 }
    );
  } finally {
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch {}
    }
  }
}
