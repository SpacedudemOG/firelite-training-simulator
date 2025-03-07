
import { useState, useCallback } from 'react';
import { PanelState, initialState } from '../constants/panelMenus';
import { usePanelHandlers } from './usePanelHandlers';
import { useDisplayTime } from './useDisplayTime';

const usePanelState = () => {
  const [state, setState] = useState<PanelState>(initialState);
  
  const {
    setDisplayLines,
    handleNumberPress,
    handleEnterPress,
    handleEscPress,
    handleArrowPress,
    handleFunctionPress,
    simulateCondition
  } = usePanelHandlers(state, setState);

  // Use the time display hook
  useDisplayTime(state, setDisplayLines);
  
  return {
    displayLines: state.displayLines,
    power: state.power,
    alarm: state.alarm,
    trouble: state.trouble,
    supervisory: state.supervisory,
    silenced: state.silenced,
    handleNumberPress,
    handleEnterPress,
    handleEscPress,
    handleArrowPress,
    handleFunctionPress,
    simulateCondition
  };
};

export default usePanelState;
