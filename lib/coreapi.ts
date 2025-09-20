export const COREAPI_BASE =
  process.env.COREAPI_BASE || "https://devhubapi.gma.to/api";
export const EMBED_BASE =
  process.env.EMBED_BASE || "http://localhost";

/**
 * Login user against CoreAPI (/login/hub).
 * Returns { error, msg, firstName, locations[], token }
 */
export async function coreapiLogin(email: string, password: string) {
  const body = new URLSearchParams({ email, password, agree: "on", app: "dom" });
  const res = await fetch(`${COREAPI_BASE}/login/hub`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const json = await res.json();

  // 👇 Debug: you'll see the CoreAPI response in your terminal logs
  console.log("CoreAPI login raw JSON:", json);

  return json;
}

/**
 * Set the active location (/user/dom/location/set).
 * Takes temporary token + location id, returns JWT.
 */
export async function coreapiSetLocation(token: string, lid: number) {
  const body = JSON.stringify({ item: { locId: lid } });
  const res = await fetch(
    `${COREAPI_BASE.replace(/\/$/, "")}/user/dom/location/set`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Set location failed: ${res.status}`);
  return res.json();
}

/**
 * Generate OTP for Desking iframe (/l/otp/get).
 */
export async function coreapiGetOtp(jwt: string) {
  const res = await fetch(`${COREAPI_BASE}/l/otp/get`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`OTP failed: ${res.status}`);
  return res.json();
}
