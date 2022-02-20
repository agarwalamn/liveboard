import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/dist/client/router';

import {
  CREATE_AND_JOIN_TEXT,
  GLOBAL_JOIN_TEXT,
  HINT_MESSAGE,
  LIVEBOARD,
} from 'utils/Strings';
import styles from './Hero.module.scss';
import { HeroOption } from 'utils/Interface';
import SEO from '../SEO';

export const Hero = () => {
  const router = useRouter();

  const handleOptionClick = (option: HeroOption) => {
    router.push(`/join/${option}`);
  };

  return (
    <SEO
      title="Liveboard"
      description="Share canvas with your friends to draw unique ideas, powered by web sockets and Tooling options"
    >
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
          <div className={styles.footer}>{HINT_MESSAGE}</div>
        </div>
      </div>
    </SEO>
  );
};
