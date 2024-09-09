import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, ...rest }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure that this code only runs on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && videoRef.current) {
      // Dynamically import Plyr only on the client side
      (async () => {
        const Plyr = (await import("plyr")).default;
        const player = new Plyr(videoRef.current!, {
          controls: ["play", "current-time", "mute", "volume", "fullscreen"], // Customize controls as needed
        });

        // Cleanup on unmount
        return () => {
          player.destroy();
        };
      })();
    }
  }, [isClient]);

  return (
    <video ref={videoRef} className="plyr-react plyr" controls {...rest}>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
