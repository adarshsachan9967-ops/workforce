import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@workforceinfotech.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Workforce@2027";
const SESSION_COOKIE = "wf_admin_session";

export async function getCurrentAdminEmailAsync(): Promise<string> {
  try {
    const creds = await db.getAdminCredentialsAsync();
    if (creds?.email) return creds.email;
  } catch {}
  return DEFAULT_ADMIN_EMAIL;
}

export function getCurrentAdminEmail(): string {
  try {
    const creds = db.getAdminCredentials();
    return creds?.email || DEFAULT_ADMIN_EMAIL;
  } catch {
    return DEFAULT_ADMIN_EMAIL;
  }
}

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  const normalizedInputEmail = email.trim().toLowerCase();

  try {
    const creds = await db.getAdminCredentialsAsync();
    if (creds && creds.email) {
      if (normalizedInputEmail === creds.email.toLowerCase() && pass === creds.passwordHash) {
        return true;
      }
    }
  } catch (e) {
    console.warn("Async credentials check error, falling back:", e);
  }

  const localCreds = db.getAdminCredentials();
  if (localCreds && localCreds.email) {
    if (normalizedInputEmail === localCreds.email.toLowerCase() && pass === localCreds.passwordHash) {
      return true;
    }
  }

  return (
    normalizedInputEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
    pass === DEFAULT_ADMIN_PASSWORD
  );
}

export async function createAdminSession(email?: string): Promise<string> {
  const userEmail = email || (await getCurrentAdminEmailAsync());

  const token = Buffer.from(
    JSON.stringify({
      user: userEmail,
      role: "ADMIN",
      issuedAt: Date.now(),
    })
  ).toString("base64");

  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (e) {
    console.warn("Could not set cookieStore session:", e);
  }

  return token;
}

export async function getAdminSession(
  req?: NextRequest
): Promise<{ user: string; role: string; token: string } | null> {
  try {
    let token: string | undefined;

    // 1. Check req cookies if NextRequest was provided
    if (req) {
      token = req.cookies.get(SESSION_COOKIE)?.value;

      // 2. Check Authorization Bearer header
      if (!token) {
        const authHeader = req.headers.get("authorization");
        if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
          token = authHeader.substring(7).trim();
        }
      }

      // 3. Check x-admin-token header
      if (!token) {
        token = req.headers.get("x-admin-token") || undefined;
      }

      // 4. Check raw cookie header fallback
      if (!token) {
        const rawCookie = req.headers.get("cookie");
        if (rawCookie) {
          const match = rawCookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
          if (match) token = decodeURIComponent(match[1]);
        }
      }
    }

    // 5. Check next/headers cookies()
    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get(SESSION_COOKIE)?.value;
      } catch {}
    }

    if (!token) return null;

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (!decoded || typeof decoded !== "object") return null;

    // Check expiration (30 days validity)
    if (decoded.issuedAt && Date.now() - decoded.issuedAt > 30 * 24 * 60 * 60 * 1000) {
      return null;
    }

    // Validate role or user
    if (decoded.role === "ADMIN" || decoded.user) {
      return {
        user: decoded.user || DEFAULT_ADMIN_EMAIL,
        role: decoded.role || "ADMIN",
        token,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
  } catch {}
}
