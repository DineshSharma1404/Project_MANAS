import React, { useRef, useState } from "react";
import DraggableAnimal from "./DraggableAnimal";
import animal1 from "../assets/animal1.png";
import animal2 from "../assets/animal2.png";
import animal3 from "../assets/animal3.png";
import animal4 from "../assets/animal4.png";
import animal5 from "../assets/animal5.png";
import alarmSound from "../assets/siren.mp3";

const AnimalCanvas = () => {
  const containerRef = useRef(null);
  const alarmAudio = useRef(new Audio(alarmSound));

  const [isAnyAnimalOut, setIsAnyAnimalOut] = useState(false);

  const playAlarm = () => {
    if (alarmAudio.current.paused) {
      alarmAudio.current.play();
    }
  };

  const stopAlarm = () => {
    if (!alarmAudio.current.paused) {
      alarmAudio.current.pause();
      alarmAudio.current.currentTime = 0;
    }
  };

  const handleAnimalOutOfBounds = () => {
    if (!isAnyAnimalOut) {
      setIsAnyAnimalOut(true);
      playAlarm();
    }
  };

  const handleAnimalInBounds = () => {
    // Delay a little to avoid flickering
    setTimeout(() => {
      const stillOut =
        document.querySelectorAll(".animal.out-of-bounds").length > 0;
      if (!stillOut) {
        setIsAnyAnimalOut(false);
        stopAlarm();
      }
    }, 100);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "800px",
        height: "500px",
        border: `5px solid ${isAnyAnimalOut ? "red" : "green"}`,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
    >
      {[animal1, animal2, animal3, animal4, animal5].map((img, i) => (
        <DraggableAnimal
          key={i}
          image={img}
          style={{ top: 50 + i * 60, left: 100 + i * 30 }}
          containerRef={containerRef}
          onOutOfBounds={handleAnimalOutOfBounds}
          onInBounds={handleAnimalInBounds}
        />
      ))}
    </div>
  );
};

export default AnimalCanvas;
