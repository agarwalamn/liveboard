import React, { useRef } from 'react';

import Canvas from './Canvas/Canvas';
import { Header } from './Header/Header';

import styles from './Playground.module.scss';

export const Playground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.playground} ref={containerRef}>
      <Header />
      <Canvas name={'test'} room="test" color="#fff" stroke={1} />
    </div>
  );
};
