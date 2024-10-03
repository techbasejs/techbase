import {
  TypeLayout,
  UploaderOptions,
  UploadOptions,
  UploadProgressEventListener,
  UploadResponse,
} from "./type";

import FormDataNode from "form-data";
import { uploadManager } from "./upload-function";

type Options = UploaderOptions &
  UploadOptions & {
    onProgress?: UploadProgressEventListener;
  };
export class Uploader {
  private optionUploadFunctionKeys = ["onProgress", "headers"];

  private layout?: TypeLayout = "basic";
  private target?: string = "#inputFile";
  private accept?: string = "*";
  private disabled?: boolean = false;
  private multiple?: boolean = false;
  private autoUpload?: boolean = false;
  private dragToUpload?: boolean = false;

  private form:
    | Record<string, string | Blob>
    | FormData
    | FormDataNode
    | Blob
    | BufferSource;
  private endpointApi: string;
  private headers?: Record<string, string>;
  private withCredentials?: boolean = false;

  private onProgress?: UploadProgressEventListener;

  constructor(options: Options) {
    if (!options) {
      throw new Error("Missing options");
    }

    if (!options.endpointApi || typeof options.endpointApi !== "string") {
      throw new Error("Destination URL is missing or invalid.");
    }

    this.form = options.form;
    this.endpointApi = options.endpointApi;
    this.headers = options.headers;
    this.withCredentials = options.withCredentials;
    this.layout = options.layout;
    this.target = options.target;
    this.accept = options.accept;
    this.disabled = options.disabled;
    this.multiple = options.multiple;
    this.autoUpload = options.autoUpload;
    this.dragToUpload = options.dragToUpload;
    this.onProgress = options.onProgress;
  }

  // submit upload
  async submit(): Promise<UploadResponse> {
    return await uploadManager.upload(
      this.endpointApi,
      this.form,
      {
        headers: this.headers,
        onProgress: this.onProgress,
      },
      this.withCredentials,
    );
  }
  // render html upload template
  render() {}
}
