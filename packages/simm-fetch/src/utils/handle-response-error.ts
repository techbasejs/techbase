import { AxiosError } from 'axios';


export async function handleResponseError(error: AxiosError): Promise<never> {
    // console.error('Response error:', error.message);
    // console.error('Status:', error.response?.status);
    // console.error('Data:', error.response?.data);
    throw error;
}
