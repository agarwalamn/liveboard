import React from 'react';
import cn from 'classnames';

import styles from './JoinForm.module.scss';
import { HeroOption } from 'utils/Interface';
import { LIVEBOARD } from 'utils/Strings';
import CustomJoinForm from './CustomJoinForm';
import GlobalJoinForm from './GlobalJoinForm';

interface JoinForm {
  variant: HeroOption;
}

export const JoinForm = ({ variant }: JoinForm) => {
  return (
    <div
      className={cn(styles.formContainer, {
        [styles.custom]: variant === HeroOption.Custom,
        [styles.global]: variant === HeroOption.Global,
      })}
    >
      <div className={styles.heading}>{LIVEBOARD}</div>
      {variant === HeroOption.Custom ? <CustomJoinForm /> : <GlobalJoinForm />}
    </div>
  );
};
