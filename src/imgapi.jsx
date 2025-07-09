const API_BASE = "http://localhost:8080";

export async function apiRequest(
  path,
  method = "GET",
  body = null,
  token = null
) {
  const headers = { "Content-Type": "multipart/form-data" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}