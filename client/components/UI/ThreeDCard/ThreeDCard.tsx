import React, { ReactElement, useRef, useState } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface IThreeDCardProps {
  children: ReactElement;
}

const ThreeDCard = ({ children }: IThreeDCardProps): ReactElement => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [20, -20]);
  const rotateY = useTransform(x, [0, 400], [-20, 20]);

  function handleMouse(event) {
    x.set(event.pageX);
    y.set(event.pageY);
  }
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
    >
      {children}
    </motion.div>
  );
};

export default ThreeDCard;
