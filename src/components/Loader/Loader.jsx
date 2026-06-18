import React, { useEffect, useRef, useState } from "react";
import styles from "./Loader.module.css";
import { Zap } from "lucide-react";

export default function Loader({
  onDone, 

  // I am setting it to null, because there are several issues that i dont know the solution for currently.
  // Issues are responsiveness of video, audio not working.
  // If you know the solution you can make a pull request with video fixed.
  videoSrc = "null" 
}) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + 1;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 100) startFade();
  }, [progress]);

  function startFade() {
    setFading(true);
    setTimeout(onDone, 600);
  }

  function handleVideoEnd() {
    startFade();
  }

  function handleVideoError() {
    setVideoFailed(true);
  }

  return (
    <div className={`${styles.loader} ${fading ? styles.fadeOut : ""}`}>
      {!videoFailed ? (
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          />
        </div>
      ) : (
        <div
          className={`${styles.overlay} ${
            videoFailed ? styles.overlayFull : ""
          }`}
        >
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <span className={styles.logoIcon}>
                <Zap size={26} />
              </span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoRed}>BOT</span>LEAGUE
            </div>
            <p className={styles.tagline}>INDIA'S ULTIMATE ROBOTICS ARENA</p>
          </div>

          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressPct}>{progress}%</span>
          </div>

          <p className={styles.hint}>Loading arena…</p>
        </div>
      )}
    </div>
  );
}
