"use client";

import { useRef, useState } from "react";
import { HomeEditorialVideo } from "./home-editorial-video";

export function HomeEventVideoSequence() {
  const [activeClip, setActiveClip] = useState<number | null>(0);
  const [firstFinished, setFirstFinished] = useState(false);
  const sequenceFinishedRef = useRef(false);

  function finishClip(index: number) {
    if (index === 0) {
      setFirstFinished(true);
      setActiveClip(sequenceFinishedRef.current ? null : 1);
    } else {
      sequenceFinishedRef.current = true;
      setActiveClip(null);
    }
  }

  return (
    <div className="home-experience-cta-media" aria-label="Luxe event films">
      {[1, 2].map((number, index) => {
        const source = number === 2 ? "your-event-your-way-2-slow" : "your-event-your-way-1";

        return (
          <div className="home-experience-cta-video" key={number}>
            <HomeEditorialVideo
              fadeIn
              playOnce
              autoPlayEnabled={activeClip === index}
              disabled={index === 1 && !firstFinished}
              label={`Your event. Your way. Film ${number}`}
              mp4={`/images/home/${source}.mp4`}
              webm={`/images/home/${source}.webm`}
              poster={`/images/home/your-event-your-way-${number}-poster.webp`}
              onPlaybackStart={() => setActiveClip(index)}
              onPlaybackEnd={() => finishClip(index)}
            />
          </div>
        );
      })}
    </div>
  );
}
