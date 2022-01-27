import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import ToolSettingsProvider from 'hooks/context/useToolsSettings';
import Canvas from './Canvas/Canvas';
import { Header } from './Header/Header';

import styles from './Playground.module.scss';

export interface Users {
  id: string;
  name: string;
  room: string;
}

export const Playground = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [usersInRoom, setUsersInRoom] = useState<Users[]>([]);

  const updateUserInCurrentRoom = (data: Users[]) => {
    setUsersInRoom(data);
  };
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
        <Header roomName={roomId as string} usersInRoom={usersInRoom} />
        <Canvas
          name={username as string}
          room={roomId as string}
          usersInRoom={usersInRoom}
          updateUserInCurrentRoom={updateUserInCurrentRoom}
        />
      </div>
    </ToolSettingsProvider>
  );
};
