// src/api.ts

// With CRA dev proxy, we just use relative paths and let the dev server
// forward /api/* to http://localhost:3001/api/* behind the scenes.
const API_BASE_URL = ""; // empty -> same origin

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `GET ${path} failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function apiPost<T = any>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function apiPatch<T = any>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `PATCH ${path} failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}
