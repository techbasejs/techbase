
type ResponseHook = (responseData: { data: any, headers: Record<string, string>, status: number }) => void | Promise<void>;

const responseHooks: ResponseHook[] = [];

export const registerResponseHook = (hook: ResponseHook) => {
  responseHooks.push(hook);
};
export const executeResponseHooks = async (
  responseData: { data: any, headers: Record<string, string>, status: number },
  afterResponse?: ResponseHook
) => {
  if (afterResponse) {
    await Promise.resolve(afterResponse(responseData));
  }

  for (const hook of responseHooks) {
    await Promise.resolve(hook(responseData));
  }
};
export const handleResponseSuccess = async (
  // response: AxiosResponse | Response,
  response: any,
) => {
  let responseData: any
  try {
    const isAxiosResponse = 'data' in response;
    responseData = {
      data: isAxiosResponse ? response.data : await response.json(),
      headers: isAxiosResponse ? response.headers : Object.fromEntries(response.headers.entries()),
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    };
  } catch {
    responseData = response
  }

  //await executeResponseHooks(responseData, config?.afterResponse);
  return responseData;
};
