import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const level = ((formData.get("level") as string) || "n4").toLowerCase();
    const type = ((formData.get("type") as string) || "pdf").toLowerCase();
    const customName = formData.get("fileName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name - remove path traversal and slashes
    let baseRaw = path.basename((customName || file.name).trim());
    let safeName = baseRaw.replace(/[\/\\#?&:\s]+/g, "-");
    if (!safeName.toLowerCase().endsWith(".pdf") && type === "pdf") {
      safeName += ".pdf";
    }


    const subDir = type === "audio" ? "audio/jlpt" : "pdf/jlpt";
    const targetDir = path.join(process.cwd(), "public", subDir, level);

    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, safeName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/${subDir}/${level}/${safeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: safeName,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error("[Upload API] Error saving file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save file" },
      { status: 500 }
    );
  }
}
