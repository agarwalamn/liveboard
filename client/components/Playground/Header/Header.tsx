import React from 'react';
import { toast } from 'react-toastify';

import styles from './Header.module.scss';
import { Tools } from './Tools';
import { UsersBadges } from './UsersBadges';
import GithubLogo from 'assets/github-logo.svg';
import CopyIcon from 'assets/copy.svg';
import { Users } from '../Playground';

interface HeaderProps {
  roomName: string;
  usersInRoom: Users[];
}

export const Header = ({ roomName, usersInRoom }: HeaderProps) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_LIVEBOARD_FRONTEND_URL}/join/custom?inviteRoomCode=${roomName}`,
    );
    toast('🔗 Link copied to  your clipboard !');
  };
  return (
    <div className={styles.header}>
      <Tools />
      <div className={styles.roomInfo}>
        <span>{roomName}</span>
        <button onClick={copyToClipBoard}>
          <CopyIcon />
        </button>
      </div>
      <div className={styles.subOptions}>
        <UsersBadges users={usersInRoom.map((user) => user.name)} />
        <a
          href="https://github.com/agarwalamn/liveboard"
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo className={styles.githubLogo} />
        </a>
      </div>
    </div>
  );
};
