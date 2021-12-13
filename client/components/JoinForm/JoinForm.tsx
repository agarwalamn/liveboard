import React, { useState } from 'react';
import cn from 'classnames';

import styles from './JoinForm.module.scss';
import { HeroOption } from 'utils/Interface';
import { LIVEBOARD } from 'utils/Strings';
import { useRouter } from 'next/router';
import { generateRandomRoomName } from 'utils/Helper';

interface JoinForm {
  variant: HeroOption;
}

export const JoinForm = ({ variant }: JoinForm) => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (name.trim().length <= 0) return;

    const roomName =
      variant === HeroOption.Custom
        ? generateRandomRoomName()
        : HeroOption.Global;

    router.push(`/playground/${roomName}/${name}`);
  };

  return (
    <div
      className={cn(styles.formContainer, {
        [styles.custom]: variant === HeroOption.Custom,
        [styles.global]: variant === HeroOption.Global,
      })}
    >
      <div className={styles.heading}>{LIVEBOARD}</div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className={cn({
              [styles.customInput]: variant === HeroOption.Custom,
              [styles.globalinput]: variant === HeroOption.Global,
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            className={cn(styles.continueBtn, {
              [styles.customBtn]: variant === HeroOption.Custom,
              [styles.globalBtn]: variant === HeroOption.Global,
            })}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
