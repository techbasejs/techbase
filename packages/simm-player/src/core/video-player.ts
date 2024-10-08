// VideoPlayer.ts
import { VideoPlayerOptions } from "./type";
class VideoPlayer {
  private container: HTMLElement;
  private playClass: string;
  private muteClass: string;
  private video: HTMLVideoElement;
  private playToggleButton: HTMLButtonElement;
  private muteToggleButton: HTMLButtonElement;

  /**
   * Initialize VideoPlayer with the provided options.
   * @param {VideoPlayerOptions} options - Configuration options.
   */
  constructor(options: VideoPlayerOptions) {
    this.container = options.container;
    this.playClass = options.playClass ?? "play";
    this.muteClass = options.muteClass ?? "mute";

    // Create and insert HTML
    this.video = this.createVideoElement(
      options.videoSrc,
      options.posterSrc,
      options.width,
      options.height,
    );
    this.playToggleButton = this.createButton("Toggle play", "play-toggle");
    this.muteToggleButton = this.createButton("Toggle mute", "mute-toggle");

    const figure = document.createElement("figure");
    figure.classList.add("video-player");
    figure.append(this.video);
    figure.append(this.playToggleButton);
    figure.append(this.muteToggleButton);

    this.container.append(figure);

    // Link events
    this.bindVideoEvents();
    this.bindControlEvents();
  }

  /**
   * Creates the video element.
   */
  private createVideoElement(
    videoSrc: string,
    posterSrc?: string,
    width: number = 1280,
    height: number = 720,
  ): HTMLVideoElement {
    const video = document.createElement("video");
    video.width = width;
    video.height = height;
    video.preload = "none";
    if (posterSrc) video.poster = posterSrc;

    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = "video/mp4";

    video.append(source);

    return video;
  }

  /**
   * Create control buttons (play/mute).
   */
  private createButton(text: string, className: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    return button;
  }

  /**
   * Link events related to the video.
   */
  private bindVideoEvents(): void {
    this.video.addEventListener("play", this.handlePlay);
    this.video.addEventListener("pause", this.handlePause);
    this.video.addEventListener("volumechange", this.handleVolumeChange);
  }

  /**
   * Bind events to control buttons.
   */
  private bindControlEvents(): void {
    this.playToggleButton.addEventListener("click", this.togglePlay);
    this.muteToggleButton.addEventListener("click", this.toggleMute);
  }

  /**
   * Handle events when video is played.
   */
  private handlePlay = (): void => {
    this.container.classList.add(this.playClass);
  };

  /**
   * Handles events when video is paused.
   */
  private handlePause = (): void => {
    this.container.classList.remove(this.playClass);
  };

  /**
   * Handle events when volume changes (mute/unmute).
   */
  private handleVolumeChange = (): void => {
    if (this.video.muted) {
      this.container.classList.add(this.muteClass);
    } else {
      this.container.classList.remove(this.muteClass);
    }
  };

  /**
   * Toggle the play/pause state of the video.
   */
  public togglePlay = (): void => {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  };

  /**
   * Toggle mute/unmute status of video.
   */
  public toggleMute = (): void => {
    this.video.muted = !this.video.muted;
  };

  /**
   * Unlink events when no longer in use.
   */
  public destroy(): void {
    this.video.removeEventListener("play", this.handlePlay);
    this.video.removeEventListener("pause", this.handlePause);
    this.video.removeEventListener("volumechange", this.handleVolumeChange);
    this.playToggleButton.removeEventListener("click", this.togglePlay);
    this.muteToggleButton.removeEventListener("click", this.toggleMute);
  }
}

export default VideoPlayer;
