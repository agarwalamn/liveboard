import React, { useState } from 'react';

import styles from './Header.module.scss';

const availableStrokeOptions = [1, 2, 3, 4, 5, 6];

/**
 * This component will contain the tools needed for the header option
 * @returns react component with tools
 */
export const Tools = () => {
  const [strokeColor, setStrokeColor] = useState('#fca311');

  return (
    <div className={styles.toolsContainer}>
      <div className={styles.colorPicker}>
        <input
          className={styles.colorPickerInput}
          type="color"
          name="color_picker"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
        />
        <div className={styles.colorCode}>{strokeColor}</div>
      </div>
      <div className={styles.strokePicker}>
        <select>
          {availableStrokeOptions.map((stroke) => (
            <option value={stroke} key={stroke}>
              {stroke}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.clearScreen}>Clear</div>
    </div>
  );
};
