import React, { useState } from 'react';
import cn from 'classnames';

import styles from './JoinForm.module.scss';
import { HeroOption } from 'utils/Interface';
import { useRouter } from 'next/router';

import SEO from 'components/SEO';

const GlobalJoinForm = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (name.trim().length <= 0) return;
    router.push(`/playground/${HeroOption.Global}/${name}`);
  };

  return (
    <SEO
      title="Global lobby"
      description="Join global lobby with strangers and have fun"
    >
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.globalinput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            className={cn(styles.continueBtn, styles.globalBtn)}
            onClick={handleContinue}
          >
            Join
          </button>
        </div>
      </form>
    </SEO>
  );
};

export default GlobalJoinForm;
