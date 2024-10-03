import {
  UploadOptions,
  UploadProgressEventListener,
  UploadResponse,
} from "./type";
import FormDataNode from "form-data";
import { Upload } from "./upload";

interface UploadFunctionOptions
  extends Omit<UploadOptions, "form" | "endpointApi" | "withCredentials"> {
  onProgress?: UploadProgressEventListener;
}

class UploadManager {
  private uploadInstance: Upload | null = null;

  private createUploadInstance(
    endpointApi: string,
    form:
      | Record<string, string | Blob>
      | FormData
      | FormDataNode
      | Blob
      | BufferSource,
    options?: UploadFunctionOptions,
    withCredentials: boolean = false,
  ): void {
    this.uploadInstance = new Upload({
      endpointApi,
      form,
      withCredentials,
      ...options,
    });
  }

  public async upload(
    endpointApi: string,
    form:
      | Record<string, string | Blob>
      | FormData
      | FormDataNode
      | Blob
      | BufferSource,
    options?: UploadFunctionOptions,
    withCredentials: boolean = false,
  ): Promise<UploadResponse> {
    this.createUploadInstance(endpointApi, form, options, withCredentials);

    if (options?.onProgress && this.uploadInstance) {
      this.uploadInstance.on("progress", options.onProgress);
    }

    if (this.uploadInstance) {
      return await this.uploadInstance.upload();
    } else {
      throw new Error("Upload instance not created");
    }
  }

  public abortUpload(): void {
    if (this.uploadInstance) {
      this.uploadInstance.abort();
    } else {
      throw new Error("No upload instance to abort");
    }
  }
}

export const uploadManager = new UploadManager();
