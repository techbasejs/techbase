import {
  FormUploadDataType,
  HttpOptions,
  UploadError,
  UploadErrorEventListener,
  UploadEventListenerUnion,
  UploadEvents,
  UploadProgressEventListener,
  UploadResponse,
  UploadState,
  UploadStateChangeEventListener,
} from "./type";
import FormDataNode from "form-data";

export class Upload {
  private events: UploadEvents = {
    state: new Set(),
    error: new Set(),
    progress: new Set(),
  };
  private form:
    | Record<string, string | Blob>
    | FormData
    | FormDataNode
    | Blob
    | BufferSource
    | URLSearchParams
    | string;
  private endpointApi: string;
  private headers?: Record<string, string>;
  private xhr?: XMLHttpRequest;
  private withCredentials?: boolean = false;

  private _uploadedBytes = 0;
  private _totalBytes = 0;
  private _state: UploadState = "new";
  constructor(form: FormUploadDataType, options: HttpOptions) {
    this.form = form;
    this.endpointApi = options.endpointApi;
    this.headers = options.headers;
    this.withCredentials = options.withCredentials;
    this.xhr = options.xhr;
  }

  public async upload(): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      resolve({ data: "", status: 200 });
    });
  }

  public setFileList(files: File[]): void {}

  public clearFiles(): void {}

  /**
   * function when clicking the uploaded files
   * @param file
   */
  public onPreview(file: File | string | unknown): void {}

  /**
   * function when clicking the remove file button
   * @param file
   * @param fileList
   */
  public onRemove(file: File, fileList: File[]): void {}

  /**
   * function when uploaded successfully
   * @param response
   * @param file
   * @param fileList
   */
  public onSuccess(
    response: UploadResponse,
    file: File,
    fileList: File[],
  ): void {}

  /**
   *  function when some errors occurs
   * @param error
   * @param file
   * @param fileList
   */
  public onError(error: UploadError, file: File, fileList: File[]): void {}

  /**
   * function when select file or upload file success or upload file fail
   * @param file
   * @param fileList
   */
  public onChange(file: File, fileList: File[]): void {}

  /**
   * function before uploading with the file to be uploaded as its parameter. If false is  returned or a Promise is returned and then is rejected, uploading will be aborted
   * @param file
   */
  public beforeUpload(file: File): void {}

  /**
   * function before removing a file with the file and file list as its parameters. If false is returned or a Promise is returned and then is rejected, removing will be aborted.
   * @param file
   * @param fileList
   */
  public beforeRemove(file: File, fileList: File[]): void {}

  public abort(): void {
    this.xhr?.abort();
  }

  get uploadedBytes(): number {
    return this._uploadedBytes;
  }

  private setUploadedBytes(value: number) {
    this._uploadedBytes = value;
    this.emit("progress", this.progress);
  }

  private increaseUploadedBytes(value: number) {
    this._uploadedBytes += value;
    this.emit("progress", this.progress);
  }

  get totalBytes(): number {
    return this._totalBytes;
  }

  private setTotalBytes(value: number) {
    this._totalBytes = value;
    this.emit("progress", this.progress);
  }

  /**
   * Current upload progress. A float between 0 and 1.
   */
  get progress(): number {
    return this._totalBytes === 0 ? 0 : this._uploadedBytes / this._totalBytes;
  }

  get state(): UploadState {
    return this._state;
  }

  private setState(value: UploadState) {
    const oldState = this._state;
    this._state = value;
    if (oldState !== this._state) {
      this.emit("state", this._state);
    }
  }

  /**
   * Adds a listener for a progress event.
   * @param eventType Event type. (progress)
   * @param listener Listener function.
   */
  on(eventType: "progress", listener: UploadProgressEventListener): void;

  /**
   * Adds a listener for an error event.
   * @param eventType Event type. (error)
   * @param listener Listener function.
   */
  on(eventType: "error", listener: UploadErrorEventListener): void;

  /**
   * Adds a listener for a state change event.
   * @param eventType Event type. (state)
   * @param listener Listener function.
   */
  on(eventType: "state", listener: UploadStateChangeEventListener): void;

  /**
   * Adds a listener for a given event.
   * @param eventType Event type.
   * @param listener Listener function.
   */
  on(eventType: keyof UploadEvents, listener: UploadEventListenerUnion): void {
    this.events[eventType].add(listener as any);
  }

  /**
   * Removes a listener for a progress event.
   * @param eventType Event type. (progress)
   * @param listener Listener function.
   */
  off(eventType: "progress", listener: UploadProgressEventListener): void;

  /**
   * Removes a listener for an error event.
   * @param eventType Event type. (error)
   * @param listener Listener function.
   */
  off(eventType: "error", listener: UploadErrorEventListener): void;

  /**
   * Removes a listener for a state change event.
   * @param eventType Event type. (state)
   * @param listener Listener function.
   */
  off(eventType: "state", listener: UploadStateChangeEventListener): void;

  /**
   * Removes a listener for a given event.
   * @param eventType Event type.
   * @param listener Listener function.
   */
  off(eventType: keyof UploadEvents, listener: UploadEventListenerUnion): void {
    this.events[eventType].delete(listener as any);
  }

  private emit(eventType: keyof UploadEvents, ...args: any[]) {
    for (const listener of this.events[eventType]) {
      (listener as any).apply(this, args);
    }
  }
}
