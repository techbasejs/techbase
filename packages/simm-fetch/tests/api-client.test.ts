import HttpClient from "../src/httpClient";

describe("HttpClient", () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({
      baseURL: "https://api.example.com",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should set base URL correctly", () => {
    client.setBaseURL("https://api.newexample.com");
    expect(client.getHeaders()["baseURL"]).toBe("https://api.newexample.com");
  });

  test("should set header correctly", () => {
    client.setHeader("Authorization", "Bearer testtoken");
    expect(client.getHeaders()["Authorization"]).toBe("Bearer testtoken");
  });

  test("should merge headers correctly", () => {
    client.mergeHeaders({ "Custom-Header": "customValue" });
    expect(client.getHeaders()["Custom-Header"]).toBe("customValue");
  });

  test("should handle GET request", async () => {
    const response = await client.get("/test");
    expect(response.status).toBe(200);
  });

  test("should handle POST request", async () => {
    const response = await client.post("/test", { data: "testData" });
    expect(response.status).toBe(201);
  });

  test("should handle GraphQL request", async () => {
    const response = await client.graphql("/graphql", "{ testQuery }");
    expect(response.status).toBe(200);
  });

  // Add more tests as needed
});
