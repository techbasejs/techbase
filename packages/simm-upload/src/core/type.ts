import FormDataNode from "form-data";
import { Upload } from "./upload";

export type TypeLayout = "basic" | "advanced";

// export enum EnumTypeDriver {
//   LOCAL = "local",
//   CLOUD = "cloud",
//   S3 = "s3",
// }

export type UploaderOptions = {
  layout?: TypeLayout;
  target?: string;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  autoUpload?: boolean;
  dragToUpload?: boolean;
};

export interface UploadOptions {
  form:
    | Record<string, string | Blob>
    | FormData
    | FormDataNode
    | Blob
    | BufferSource;
  endpointApi: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface UploadResponse {
  data?: string | ArrayBuffer | Blob;
  // xhr?: XMLHttpRequest;
  status?: number;
  // headers?: Record<string, string | string[] | undefined>;
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
