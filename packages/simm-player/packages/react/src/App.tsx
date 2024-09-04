import React, { useEffect, useState } from "react";
import { initializePlayer, playVideo, getVideoInfo } from "@simm-player/core";
export const VideoPlayer = () => {
  const [videoInfo, setVideoInfo] = useState<any>(null);

  useEffect(() => {
    initializePlayer();
    setVideoInfo(getVideoInfo());
  }, []);

  return (
    <div>
      <h2>Video Player</h2>
      {videoInfo && (
        <div>
          <p>Title: {videoInfo.title}</p>
          <p>Duration: {videoInfo.duration}</p>
          <p>Resolution: {videoInfo.resolution}</p>
        </div>
      )}
      <button onClick={playVideo}>Play</button>
    </div>
  );
};

export default VideoPlayer;
