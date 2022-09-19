export default async (url, method, body) => {
  const controller = new AbortController();
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ0caL9BTaQUYRcoaYBEWz1xU&key=AIzaSyDQVquHgIP8q-jyHyRR8OKyoL-O6MfZ3kU`,
      {
        method: method,
        signal: controller.signal,
        body: typeof body === "object" ? JSON.stringify(body) : undefined,
        mode: "no-cors",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { error: error };
    }
    return await res.json();
  } catch (err) {
    return { error: "Error" };
  } finally {
    controller.abort();
  }
};
