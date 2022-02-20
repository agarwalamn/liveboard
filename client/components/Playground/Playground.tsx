import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import ToolSettingsProvider from 'hooks/context/useToolsSettings';
import Canvas from './Canvas/Canvas';
import { Header } from './Header/Header';
import styles from './Playground.module.scss';
import SEO from 'components/SEO';

export interface Users {
  id: string;
  name: string;
  room: string;
}

export const Playground = ({}) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [usersInRoom, setUsersInRoom] = useState<Users[]>([]);

  const {
    query: { roomId, username },
  } = router;

  const updateUserInCurrentRoom = (data: Users[]) => {
    setUsersInRoom(data);
  };

  if (router.isFallback) {
    return <div>We are loading page for you</div>;
  }

  if (!roomId && !username) {
    router.back();
  }

  return (
    <SEO title="Playground" description="Lobby where actual magic happens">
      <ToolSettingsProvider>
        <div className={styles.playground} ref={containerRef}>
          <Header roomName={roomId as string} usersInRoom={usersInRoom} />
          <Canvas
            name={(username as string).trim().toLowerCase()}
            room={roomId as string}
            usersInRoom={usersInRoom}
            updateUserInCurrentRoom={updateUserInCurrentRoom}
          />
        </div>
      </ToolSettingsProvider>
    </SEO>
  );
};
