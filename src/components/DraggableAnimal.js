import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

const DraggableAnimal = ({
  image,
  style,
  containerRef,
  onOutOfBounds,
  onInBounds,
}) => {
  const animalRef = useRef(null);
  const [isOutside, setIsOutside] = useState(false);

  const handleDrag = () => {
    const animal = animalRef.current?.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();

    if (!animal || !container) return;

    const out =
      animal.left < container.left ||
      animal.right > container.right ||
      animal.top < container.top ||
      animal.bottom > container.bottom;

    if (out && !isOutside) {
      setIsOutside(true);
      animalRef.current.classList.add("out-of-bounds");
      onOutOfBounds();
    } else if (!out && isOutside) {
      setIsOutside(false);
      animalRef.current.classList.remove("out-of-bounds");
      onInBounds();
    }
  };

  return (
    <Draggable onDrag={handleDrag}>
      <img
        ref={animalRef}
        src={image}
        alt="Animal"
        className="animal"
        style={{
          width: 60,
          height: 60,
          position: "absolute",
          cursor: "grab",
          userSelect: "none",
          ...style,
        }}
      />
    </Draggable>
  );
};

export default DraggableAnimal;
