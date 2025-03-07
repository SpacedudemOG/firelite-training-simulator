
import { useEffect } from 'react';
import { PanelState, initialState } from '../constants/panelMenus';

export const useDisplayTime = (
  state: PanelState,
  setDisplayLines: (lines: string[]) => void
) => {
  // Timer effect for updating the time on the display
  useEffect(() => {
    // Only update time when on the default screen
    if (state.displayLines[0] === initialState.displayLines[0] && 
        state.displayLines[1] === initialState.displayLines[1]) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
        
        setDisplayLines([
          "FIRE-LITE MS-9600UDLS",
          "SYSTEM NORMAL",
          `${timeString} ${dateString}`,
          "<Menu> to Customize"
        ]);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [state.displayLines, setDisplayLines]);
};
