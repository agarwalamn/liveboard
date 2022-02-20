import React, { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './JoinForm.module.scss';
import SEO from 'components/SEO';

const CustomJoinForm = () => {
  const router = useRouter();
  const { inviteRoomCode } = router.query;

  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState((inviteRoomCode as string) ?? '');

  const handleContinue = () => {
    if (name.trim().length <= 0 || roomName.trim().length <= 0) return;
    router.push(`/playground/${roomName}/${name}`);
  };

  return (
    <SEO
      title={
        inviteRoomCode
          ? `Invite link for ${inviteRoomCode}`
          : 'Create custom room'
      }
      description={
        inviteRoomCode
          ? `Join ${inviteRoomCode} lobby by clicking this`
          : 'Create custom liveboard lobby'
      }
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.customInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="roomName"
            placeholder="Lobby Name"
            className={styles.customInput}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            disabled={!!inviteRoomCode}
          />
          <button
            className={cn(styles.continueBtn, styles.customBtn)}
            onClick={handleContinue}
          >
            Join
          </button>
        </div>
      </form>
    </SEO>
  );
};

export default CustomJoinForm;
