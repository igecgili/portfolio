import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { defaultProjects } from "@/lib/projects";

const KEY = "ig_projects";

function getRedis() {
  const url = process.env.STORAGE_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.STORAGE_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json(defaultProjects);
    const data = await redis.get(KEY);
    return NextResponse.json(data ?? defaultProjects);
  } catch {
    return NextResponse.json(defaultProjects);
  }
}

export async function POST(req: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: "Redis bağlantısı yok" }, { status: 500 });
    const projects = await req.json();
    await redis.set(KEY, projects);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
