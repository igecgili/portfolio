import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { defaultProjects } from "@/lib/projects";

const KEY = "ig_projects";

export async function GET() {
  try {
    const data = await kv.get(KEY);
    return NextResponse.json(data ?? defaultProjects);
  } catch {
    return NextResponse.json(defaultProjects);
  }
}

export async function POST(req: NextRequest) {
  try {
    const projects = await req.json();
    await kv.set(KEY, projects);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
