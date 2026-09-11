import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Clean Japanese text for natural speech synthesis
 */
function cleanText(text: string): string {
  if (!text) return "";
  let cleaned = text;
  cleaned = cleaned.replace(/<rt>[^<]*<\/rt>/gi, "");
  cleaned = cleaned.replace(/<[^>]+>/g, "");
  cleaned = cleaned.replace(/[\u4e00-\u9faf\u3400-\u4dbf]+[（\(\[\【]([ぁ-んァ-ヶ]+)[）\)\]\】]/g, "$1");
  cleaned = cleaned.replace(/[（\(\[\【][^）\)\]\】]*[）\)\]\】]/g, "");
  cleaned = cleaned.replace(/[🔊📢🔊🗣️]/g, "");
  cleaned = cleaned.replace(/\[[^\]]+\]/g, "");
  return cleaned.trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawText = searchParams.get("text") || "";
    const textToSpeak = cleanText(rawText);

    if (!textToSpeak) {
      return new NextResponse("Missing text parameter", { status: 400 });
    }

    // High quality Japanese Neural Speech URL
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(
      textToSpeak
    )}`;

    const response = await fetch(googleTtsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
      next: { revalidate: 86400 }, // Cache audio for 24 hours
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch audio stream", { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch (error: any) {
    console.error("TTS API Route Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
