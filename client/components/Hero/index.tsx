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
          <pre>{CREATE_AND_JOIN_TEXT}</pre>
        </div>
        <div
          className={cn(styles.option, styles.optionSecondary)}
          onClick={() => handleOptionClick(HeroOption.Global)}
          tabIndex={0}
          role="button"
        >
          <pre>{GLOBAL_JOIN_TEXT}</pre>
        </div>
      </div>
    </div>
  );
};
