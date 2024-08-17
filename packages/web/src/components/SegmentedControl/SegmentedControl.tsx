import React, { useRef, useState, useEffect, RefObject, MutableRefObject } from "react";
import "./styles.css";

interface Segment<ID> {
  value: ID;
  label: string;
  ref: RefObject<HTMLDivElement>;
}

interface SegmentedControlProps<ID> {
  name: string;
  segments: Segment<ID>[];
  callback: (value: ID) => void;
  defaultIndex?: number;
  controlRef: MutableRefObject<HTMLDivElement | null>;
}

const SegmentedControl = <ID extends string | number>({
                                                        name = 'example',
                                                        segments,
                                                        callback,
                                                        defaultIndex = 0,
                                                        controlRef,
                                                      }: SegmentedControlProps<ID>) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const componentReady = useRef(false);

  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    const activeSegmentRef = segments[activeIndex].ref;
    if (activeSegmentRef.current && controlRef.current) {
      const { offsetWidth, offsetLeft } = activeSegmentRef.current;
      const { style } = controlRef.current;

      style.setProperty("--highlight-width", `${offsetWidth}px`);
      style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
    }
  }, [activeIndex, segments, controlRef]);

  const onInputChange = (value: ID, index: number) => {
    setActiveIndex(index);
    callback(value);
  };

  return (
    <div className="controls-container" ref={controlRef}>
      <div className={`controls ${componentReady.current ? "ready" : "idle"}`}>
        {segments.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? "active" : "inactive"}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
