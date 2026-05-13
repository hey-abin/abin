import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "portfolio_admin";
const maxAge = 60 * 60 * 24 * 7;

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge,
  path: "/",
};

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
}

function sign(value) {
  const secret = getSecret();
  if (!secret) {
    throw new Error("ADMIN_PASSWORD or ADMIN_SECRET is not configured");
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminCookieName)?.value;

  if (!session) {
    return false;
  }

  const [createdAt, signature] = session.split(".");
  const timestamp = Number(createdAt);

  if (!timestamp || !signature) {
    return false;
  }

  const expired = Date.now() - timestamp > maxAge * 1000;
  if (expired) {
    return false;
  }

  return safeEqual(signature, sign(createdAt));
}

export async function assertAdmin() {
  if (!(await isAdminSession())) {
    throw new Error("Unauthorized");
  }
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, createAdminSessionValue(), adminCookieOptions);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export function createAdminSessionValue() {
  const createdAt = String(Date.now());
  return `${createdAt}.${sign(createdAt)}`;
}
