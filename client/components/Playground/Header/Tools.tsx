import { useToolSettings } from 'hooks/context/useToolsSettings';
import React, { RefObject, useContext, useState } from 'react';

import styles from './Header.module.scss';

const availableStrokeOptions = [1, 2, 3, 4, 5, 6];

/**
 * This component will contain the tools needed for the header option
 * @returns react component with tools
 */
export const Tools = () => {
  const { color, updateColor, stroke, updateStroke } = useToolSettings();

  return (
    <div className={styles.toolsContainer}>
      <div className={styles.colorPicker}>
        <input
          className={styles.colorPickerInput}
          type="color"
          name="color_picker"
          value={color}
          onChange={(e) => updateColor(e.target.value)}
        />
        <div className={styles.colorCode}>{color}</div>
      </div>
      <div className={styles.strokePicker}>
        <select
          value={stroke}
          onChange={(e) => updateStroke(parseInt(e.target.value))}
        >
          {availableStrokeOptions.map((avaStroke) => (
            <option value={avaStroke} key={avaStroke}>
              {avaStroke}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
