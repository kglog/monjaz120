import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: { file: string } }
) {
  try {
    // مكان الملفات على الهارد
    const filePath = path.join(process.cwd(), "data", "uploads", params.file);

    const fileBuf = await fs.readFile(filePath);

    const ext = path.extname(params.file).toLowerCase();
    let contentType = "image/jpeg";

    if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=31536000",
      },
    });
  } catch (err) {
    console.error("file not found:", params.file, err);
    return new NextResponse("Not found", { status: 404 });
  }
}

// ASSISTANT_FINAL: true
