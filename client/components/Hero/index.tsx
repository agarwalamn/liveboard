import React, { useState } from 'react';
import cn from 'classnames';

import {
  CREATE_AND_JOIN_TEXT,
  GLOBAL_JOIN_TEXT,
  LIVEBOARD,
} from 'utils/Strings';
import styles from './Hero.module.scss';
import { useRouter } from 'next/dist/client/router';
import { HeroOption } from 'utils/Interface';

export const Hero = () => {
  const router = useRouter();

  const handleOptionClick = (option: HeroOption) => {
    router.push(`/join/${option}`);
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.optionContainer}>
        <div className={styles.heroLogo}>{LIVEBOARD}</div>
        <div
          className={cn(styles.option, styles.optionPrimary)}
          onClick={() => handleOptionClick(HeroOption.Custom)}
          tabIndex={0}
          role="button"
        >
          <div className={styles.label}>{CREATE_AND_JOIN_TEXT}</div>
        </div>
        <div
          className={cn(styles.option, styles.optionSecondary)}
          onClick={() => handleOptionClick(HeroOption.Global)}
          tabIndex={0}
          role="button"
        >
          <div className={styles.label}>{GLOBAL_JOIN_TEXT}</div>
        </div>
        <div className={styles.footer}>
          Hint: Your can click on either side to continue
        </div>
      </div>
    </div>
  );
};
