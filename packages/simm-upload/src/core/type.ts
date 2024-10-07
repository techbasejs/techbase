import FormDataNode from "form-data";
import { Upload } from "./upload";

export type TypeLayout = "basic" | "advanced";

export type TypeDriver = "local" | "cloud" | "s3";

export type UploaderOptions = {
  layout?: TypeLayout;
  target?: string;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  autoUpload?: boolean;
  dragToUpload?: boolean;
};

export type FormUploadDataType =
  | Record<string, string | Blob>
  | FormData
  | FormDataNode
  | Blob
  | BufferSource;

export type HttpOptions = {
  endpointApi: string;
  xhr?: XMLHttpRequest;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export interface UploadResponse {
  data?: string | ArrayBuffer | Blob;
  xhr?: XMLHttpRequest;
  status?: number;
  headers?: Record<string, string | string[] | undefined>;
}

export type UploadError = {
  message: string;
  status: number;
};

export type UploadState =
  | "new"
  | "started"
  | "failed"
  | "successful"
  | "aborted";

export type UploadStateChangeEventListener = (
  this: Upload,
  state: UploadState,
) => void;

export type UploadProgressEventListener = (
  this: Upload,
  progress: number,
) => void;
export type UploadErrorEventListener = (this: Upload) => void;

export type UploadEventListenerUnion =
  | UploadStateChangeEventListener
  | UploadErrorEventListener
  | UploadProgressEventListener;

export interface UploadEvents {
  state: Set<UploadStateChangeEventListener>;
  error: Set<UploadErrorEventListener>;
  progress: Set<UploadProgressEventListener>;
}
