/**
 * Interface for VideoPlayer configuration options.
 */
export interface VideoPlayerOptions {
  container: HTMLElement;
  videoSrc: string;
  posterSrc?: string;
  width?: number;
  height?: number;
  playClass?: string;
  muteClass?: string;
}
