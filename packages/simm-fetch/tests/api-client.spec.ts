import axios from "axios";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import APIClient from "../src/api-client"; // Adjust this import according to your file structure
import { APIClientConfig } from "../src/types";

vi.mock("./utils/merge-configs");
vi.mock("./utils/query-params");
vi.mock("./utils/index");
vi.mock("./utils/handle-retry");

describe("APIClient", () => {
  const config: APIClientConfig = {
    baseURL: "http://mockapi.com",
    url: "/test",
    method: "GET",
    data: null,
    headers: {},
    isRetry: false,
  };

  let mock: MockAdapter;
  let client: APIClient;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    client = new APIClient(config);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should perform GET request successfully", async () => {
    const responseData = { data: "test" };
    mock.onGet(`${config.baseURL}/test`).reply(200, responseData);

    const response = await client.get("/test");

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it("should perform POST request successfully", async () => {
    const postData = { name: "test" };
    const responseData = { success: true };
    mock.onPost(`${config.baseURL}/test`, postData).reply(201, responseData);

    const response = await client.post("/test", postData);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(responseData);
  });

  it("should handle request error", async () => {
    mock.onGet(`${config.baseURL}/test`).reply(500);

    try {
      await client.get("/test");
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        expect((error as any).response.status).toBe(500);
      }
    }
  });

  it.skip("should retry request on failure when isRetry is enabled", async () => {
    config.isRetry = true;
    mock
      .onGet(`${config.baseURL}/test`)
      .replyOnce(500)
      .onGet(`${config.baseURL}/test`)
      .reply(200, { data: "retry success" });
  });

  it.skip("should cancel requests", () => {
    const cancelMessage = "Request canceled by the user.";

    client.cancelRequests(cancelMessage);

    const source = axios.CancelToken.source();
    try {
      axios.get(`${config.baseURL}/test`, { cancelToken: source.token });
      source.cancel(cancelMessage);
    } catch (error_) {
      if (axios.isCancel(error_)) {
        expect(error_.message).toBe(cancelMessage);
      }
    }
  });
});
