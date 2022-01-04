import React from 'react';
import cn from 'classnames';

import styles from './Header.module.scss';

interface UserBadgeProps {
  users: string[];
}

interface BadgeProps {
  classNames?: string;
  text: string;
}

const Badge = ({ classNames, text }: BadgeProps) => (
  <div className={cn(styles.badge, classNames)}>{text}</div>
);

export const UsersBadges = ({ users }: UserBadgeProps) => {
  const [firstUser, secondUser, ...resetUsers] = users;
  return (
    <div className={styles.badgeGroup}>
      <Badge text={firstUser[1]} />
      {secondUser && (
        <Badge classNames={styles.redBadge} text={secondUser[1]} />
      )}
      {resetUsers && resetUsers.length > 0 && (
        <Badge classNames={styles.greenBadge} text={`+${resetUsers.length}`} />
      )}
    </div>
  );
};
