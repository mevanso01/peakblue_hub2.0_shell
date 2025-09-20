import { NextRequest, NextResponse } from "next/server";
import { coreapiLogin } from "@/lib/coreapi";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing email/password" }, { status: 400 });
  }

  try {
    const data = await coreapiLogin(email, password);

    // ✅ forward exactly what CoreAPI returned
    return NextResponse.json({
      locations: data.locations ?? [],
      token: data.token,
      firstName: data.firstName,
      error: data.error,
      msg: data.msg,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Login failed" },
      { status: 400 }
    );
  }
}
