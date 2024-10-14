//import { executeResponseHooks } from "./hooks";


export const handleResponseSuccess = async (
  // response: AxiosResponse | Response,
  response: any,
  // config?: any
) => {
  let responseData: any
  try {
    const isAxiosResponse = 'data' in response;
    responseData = {
      data: isAxiosResponse ? response.data : await response.json(), //  repsonse data with axios or fetch
      headers: isAxiosResponse ? response.headers : Object.fromEntries(response.headers.entries()),
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
      // Add other response if need
    };
  } catch {
    responseData = response
  }

  // await executeResponseHooks(responseData, config?.afterResponse); 
  return responseData;
};
