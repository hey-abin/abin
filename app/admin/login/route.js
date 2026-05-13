import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  createAdminSessionValue,
} from "@/lib/admin-auth";

export async function POST(request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin?error=invalid", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set(adminCookieName, createAdminSessionValue(), adminCookieOptions);
  return response;
}
