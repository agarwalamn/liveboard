import { AnimationControls, motion, useAnimation } from 'framer-motion';
import React, { ReactElement, MouseEvent } from 'react';
import styles from './Lobby.module.scss';
import cn from 'classnames';

interface ICardAnimation {
  x: number;
  y: number;
  offsetFactor: number;
}

const Lobby = (): ReactElement => {
  const cardAnimation = useAnimation();
  const infoCradANimation = useAnimation();

  const addAnimation = (
    animator: AnimationControls,
    properties: ICardAnimation,
  ) => {
    const { x, y, offsetFactor } = properties;
    animator.start({
      x: x / offsetFactor,
      y: y / offsetFactor,
    });
  };

  const handleMouse = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const { clientX, clientY } = event;
    const moveX = clientX - window.innerWidth / 2 - rect.left;
    const moveY = clientY - window.innerHeight / 2 - rect.top;

    addAnimation(cardAnimation, { x: moveX, y: moveY, offsetFactor: 10 });
    addAnimation(infoCradANimation, { x: moveX, y: moveY, offsetFactor: 20 });
  };

  return (
    <motion.div className={styles.wrapper} onMouseMove={handleMouse}>
      <motion.div className={styles.infoCard} animate={cardAnimation}>
        <motion.div
          className={cn(styles.lobbyCard, styles.createCard)}
          animate={infoCradANimation}
        >
          Card 1
        </motion.div>
        Card 3
        <motion.div
          className={cn(styles.lobbyCard, styles.globalCard)}
          animate={infoCradANimation}
        >
          Card 2
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Lobby;
