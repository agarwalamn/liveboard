import ToolSettingsProvider from 'hooks/context/useToolsSettings';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

import Canvas from './Canvas/Canvas';
import { Header } from './Header/Header';

import styles from './Playground.module.scss';

export const Playground = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const {
    query: { roomId, username },
  } = router;

  if (router.isFallback) {
    return <div>We are loading page for you</div>;
  }

  if (!roomId && !username) return <></>;

  return (
    <ToolSettingsProvider>
      <div className={styles.playground} ref={containerRef}>
        <Header />
        <Canvas name={username as string} room={roomId as string} />
      </div>
    </ToolSettingsProvider>
  );
};
