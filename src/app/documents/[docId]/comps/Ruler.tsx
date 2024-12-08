import React, { useRef, useState, useCallback } from "react";
import { FaCaretDown } from "react-icons/fa";

const DOCUMENT_WIDTH = 816; // Width of the document
const INCREMENT = 10; // Distance between markers in pixels

// Calculate the number of markers
function calculateMarkers(documentWidth: number, increment: number) {
  return Math.floor(documentWidth / increment) + 1;
}

const markers = Array.from(
  { length: calculateMarkers(DOCUMENT_WIDTH, INCREMENT) },
  (_, i) => i
);

const Ruler = () => {
  const [margin, setMargin] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState({ left: false, right: false });
  const rulerRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging.left && !isDragging.right) return;

      if (rulerRef.current) {
        const rect = rulerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left; // Mouse position relative to the container
        const constrainedX = Math.max(0, Math.min(DOCUMENT_WIDTH, mouseX)); // Constrain within bounds

        setMargin((prev) => {
          if (isDragging.left) {
            const newLeft = Math.min(constrainedX, prev.right - 10);
            return { ...prev, left: newLeft };
          }

          if (isDragging.right) {
            const newRight = Math.max(constrainedX, prev.left + 10);
            return { ...prev, right: newRight };
          }

          return prev;
        });
      }
    },
    [isDragging]
  );

  const handleMouseDown = useCallback((side: "left" | "right") => {
    setIsDragging((prev) => ({ ...prev, [side]: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging({ left: false, right: false });
    initialPositionRef.current = null;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging({ left: false, right: false });
    initialPositionRef.current = null;
  }, []);

  const handleLeftDoubleClick = useCallback(
    () => setMargin((prev) => ({ ...prev, left: 56 })),
    []
  );

  const handleRightDoubleClick = useCallback(
    () => setMargin((prev) => ({ ...prev, right: DOCUMENT_WIDTH - 56 })),
    []
  );

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="h-6 border-b flex items-end relative select-none print:hidden bg-green-200 max-w-[816px] mx-auto"
    >
      <div id="ruler-container" className="w-full h-full relative">
        {/* Left Marker */}
        <Marker
          position={margin.left}
          alias="Left"
          isLeft={true}
          isDragging={isDragging.left}
          onMouseDown={() => handleMouseDown("left")}
          onDoubleClick={handleLeftDoubleClick}
        />
        {/* Right Marker */}
        <Marker
          position={margin.right}
          alias="Right"
          isLeft={false}
          isDragging={isDragging.right}
          onMouseDown={() => handleMouseDown("right")}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute bottom-0 left-0 w-full h-full flex items-center">
          {markers.map((marker) => {
            const leftPosition = marker * INCREMENT;
            return (
              <div
                key={marker}
                className="absolute bottom-0"
                style={{ left: `${leftPosition}px` }}
              >
                {marker % 10 === 0 && (
                  <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-600">
                    <span className="text-xs absolute bottom-2 translate-x-[-50%]">
                      {marker / 10 + 1}
                    </span>
                  </div>
                )}
                {marker % 5 === 0 && marker % 10 !== 0 && (
                  <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-600"></div>
                )}
                {marker % 5 !== 0 && (
                  <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-600"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface MarkerProps {
  position: number;
  alias?: string;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  alias,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 h-full cursor-ew-resize z-50 group"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown
        className="absolute left-1/2 -translate-x-1/2 text-primary h-full"
        style={{
          fill: isLeft ? "red" : "blue",
        }}
      />
    </div>
  );
};
