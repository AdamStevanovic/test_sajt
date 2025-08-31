import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";

const HF_SPACE = process.env.HF_SPACE!;        // npr. "Adam995/parrot_voice"
const HF_TOKEN = process.env.HF_TOKEN || "";   // za public može ostati prazno

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const audio = form.get("audio");
    if (!(audio instanceof File)) {
      return NextResponse.json({ error: "Audio file is required." }, { status: 400 });
    }
    const pitch = Number(form.get("pitch") ?? 7);
    const speed = Number(form.get("speed") ?? 1.05);
    const remove_hiss = String(form.get("remove_hiss") ?? "true") === "true";

    // konekcija ka Space-u
    const app = await client(HF_SPACE, HF_TOKEN ? { hf_token: HF_TOKEN } : undefined);

    // pozovi predict (redosled inputa mora da odgovara tvom app.py)
    const result = await app.predict("/predict", [
      audio,       // gradio Audio
      pitch,       // slider
      speed,       // slider
      remove_hiss, // checkbox
    ]);

    const out = (result as any)?.data?.[0];
    if (!out) {
      return NextResponse.json({ error: "No audio returned from Space." }, { status: 500 });
    }

    const arrayBuffer = await (out as Blob).arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store"
      }
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
