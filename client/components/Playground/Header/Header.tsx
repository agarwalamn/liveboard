import React from 'react';

import styles from './Header.module.scss';
import { Tools } from './Tools';
import { UsersBadges } from './UsersBadges';
import GithubLogo from '../../../assets/github-logo.svg';
import router from 'next/router';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Tools />
      <div>room name</div>
      <div className={styles.subOptions}>
        <UsersBadges
          users={['Aman', 'Bajrang', 'Aman', 'Bajrang', 'Aman', 'Bajrang']}
        />
        <a
          href="https://github.com/agarwalamn/liveboard_rebooted"
          target="_blank"
          rel="noreferrer"
        >
          <GithubLogo className={styles.githubLogo} />
        </a>
      </div>
    </div>
  );
};
