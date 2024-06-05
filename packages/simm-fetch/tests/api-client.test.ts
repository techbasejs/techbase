import { get, post, put, del } from "../src/api-client";

describe("API Client", () => {
  test("GET request", async () => {
    const response = await get("/endpoint");
    expect(response.status).toBe(200);
  });

  test("POST request", async () => {
    const response = await post("/endpoint", { key: "value" });
    expect(response.status).toBe(200);
  });

  test("PUT request", async () => {
    const response = await put("/endpoint", { key: "value" });
    expect(response.status).toBe(200);
  });

  test("DELETE request", async () => {
    const response = await del("/endpoint");
    expect(response.status).toBe(200);
  });

  test("GET request with retry", async () => {
    const response = await get("/endpoint", { retry: 3 });
    expect(response.status).toBe(200);
  });

  test("GET request with timeout", async () => {
    await expect(get("/endpoint", { timeout: 1000 })).rejects.toThrow(
      "Request timed out",
    );
  });
});
