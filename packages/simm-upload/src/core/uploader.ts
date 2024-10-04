import {
  TypeLayout,
  UploaderOptions,
  UploadError,
  UploadOptions,
  UploadProgressEventListener,
  UploadResponse,
} from "./type";

import FormDataNode from "form-data";
import { Upload } from "./upload";

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

  private uploadInstance: Upload;

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

    this.uploadInstance = new Upload({
      endpointApi: this.endpointApi,
      form: this.form,
      headers: this.headers,
      withCredentials: this.withCredentials,
    });
  }

  public async submit(): Promise<UploadResponse> {
    return await this.uploadInstance.upload();
  }

  public setFileList(files: File[]): void {
    this.uploadInstance.setFileList(files);
  }

  public clearFiles(): void {
    this.uploadInstance.clearFiles();
  }

  public onPreview(file: File | string | unknown): void {
    this.uploadInstance.onPreview(file);
  }

  public onRemove(file: File, fileList: File[]): void {
    this.uploadInstance.onRemove(file, fileList);
  }

  public onSuccess(
    response: UploadResponse,
    file: File,
    fileList: File[],
  ): void {
    this.uploadInstance.onSuccess(response, file, fileList);
  }

  public onError(error: UploadError, file: File, fileList: File[]): void {
    this.uploadInstance.onError(error, file, fileList);
  }

  public onChange(file: File, fileList: File[]): void {
    this.uploadInstance.onChange(file, fileList);
  }

  public onBeforeUpload(file: File): void {
    this.uploadInstance.beforeUpload(file);
  }

  public onBeforeRemove(file: File, fileList: File[]): void {
    this.uploadInstance.beforeRemove(file, fileList);
  }

  public abort() {
    if (this.uploadInstance) {
      return this.uploadInstance.abort();
    } else {
      throw new Error("No upload instance to abort.");
    }
  }

  // render html upload template
  render() {
    const target = document.querySelector(
      this.target as string,
    ) as HTMLInputElement;
    if (!target) {
      throw new Error(`Target element ${this.target} not found.`);
    }

    const html = `
    <div class="uploader">
    <input 
      type="file" 
      accept="${this.accept}" 
      ${this.multiple ? "multiple" : ""} 
      ${this.disabled ? "disabled" : ""} 
      ${this.autoUpload ? 'onchange="this.form.submit()"' : ""}
    />
    ${this.dragToUpload ? '<div class="drag-drop-area">Drag files here to upload</div>' : ""}
    </div>
  `;

    return (target.innerHTML = html);
  }
}
