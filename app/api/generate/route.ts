import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Pollinations API - no key needed, returns ready-to-use image
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=1024&height=1024`;

    return NextResponse.json({ image: imageUrl });

  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate image." },
      { status: 500 }
    );
  }
}
