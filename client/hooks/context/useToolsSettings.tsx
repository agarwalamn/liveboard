import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';

interface ToolSettingsValueProps {
  color: string;
  stroke: number;
  updateColor: (color: string) => void;
  updateStroke: (stroke: number) => void;
}

const ToolSettingsContext = createContext<ToolSettingsValueProps>({
  color: '',
  stroke: 1,
  updateColor: (_) => {},
  updateStroke: (_) => {},
});

const ToolSettingsProvider = ({
  children,
}: PropsWithChildren<{}>): ReactElement => {
  const [color, setColor] = useState<string>('#fca311');
  const [stroke, setStroke] = useState<number>(1);

  const updateColor = (updatedColor: string) => {
    setColor(updatedColor);
  };
  const updateStroke = (updatedStroke: number) => {
    setStroke(updatedStroke);
  };

  return (
    <ToolSettingsContext.Provider
      value={{ color, stroke, updateColor, updateStroke }}
    >
      {children}
    </ToolSettingsContext.Provider>
  );
};

export const useToolSettings = () => useContext(ToolSettingsContext);

export default ToolSettingsProvider;
