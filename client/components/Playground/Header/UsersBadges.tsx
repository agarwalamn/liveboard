import React from 'react';

import styles from './Header.module.scss';

interface UserBadgeProps {
  users: string[];
}

interface BadgeProps {
  color?: string;
  text: string;
}

const COLORS = ['#fc112d', '#11fc1a', '#00D1FF'];

const Badge = ({ color, text }: BadgeProps) => (
  <div className={styles.badge} style={color ? { background: color } : {}}>
    {text}
  </div>
);

export const UsersBadges = ({ users }: UserBadgeProps) => {
  const usersToShow = users.slice(0, 3);

  return (
    <div className={styles.badgeGroup}>
      {usersToShow.map((user, index) => (
        <Badge key={user} text={user[0]} color={COLORS[index]} />
      ))}

      {users.length > 3 && <Badge text={`+${users.length - 3}`} />}
    </div>
  );
};
