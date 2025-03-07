
import { useState, useCallback, useEffect } from 'react';

type MenuScreen = 'main' | 'programming' | 'point' | 'zone' | 'system' | 'history';

type PanelState = {
  displayLines: string[];
  power: boolean;
  alarm: boolean;
  trouble: boolean;
  supervisory: boolean;
  silenced: boolean;
  currentMenu: MenuScreen;
  passcode: string;
  isAuthenticated: boolean;
};

const initialState: PanelState = {
  displayLines: [
    "FIRE-LITE MS-9600UDLS",
    "SYSTEM NORMAL",
    "12:00 AM 01/01/2023",
    "<Menu> to Customize"
  ],
  power: true,
  alarm: false,
  trouble: false,
  supervisory: false,
  silenced: false,
  currentMenu: 'main',
  passcode: '',
  isAuthenticated: false
};

const usePanelState = () => {
  const [state, setState] = useState<PanelState>(initialState);
  
  const setDisplayLines = useCallback((lines: string[]) => {
    setState(prev => ({ ...prev, displayLines: lines }));
  }, []);
  
  const handleNumberPress = useCallback((num: number) => {
    // If in a passcode entry screen
    if (state.displayLines[0].includes("ENTER PASSWORD")) {
      const newPasscode = state.passcode + num;
      setState(prev => ({ ...prev, passcode: newPasscode }));
      
      // Update display to show asterisks
      setDisplayLines([
        "ENTER PASSWORD:",
        "*".repeat(newPasscode.length),
        "",
        "<Enter> to confirm"
      ]);
    }
  }, [state.displayLines, state.passcode, setDisplayLines]);
  
  const handleEnterPress = useCallback(() => {
    // Password validation logic
    if (state.displayLines[0].includes("ENTER PASSWORD")) {
      if (state.passcode === "1234") { // Example passcode
        setState(prev => ({ 
          ...prev, 
          isAuthenticated: true,
          passcode: ''
        }));
        
        // Show programming menu
        setDisplayLines([
          "PROGRAMMING MENU:",
          "1) POINT PROGRAMMING",
          "2) ZONE PROGRAMMING",
          "3) SYSTEM SETTINGS"
        ]);
      } else {
        // Invalid passcode
        setState(prev => ({ ...prev, passcode: '' }));
        setDisplayLines([
          "INVALID PASSWORD",
          "ACCESS DENIED",
          "",
          "<Esc> to return"
        ]);
      }
    } 
    // Handle other menu selections
    else if (state.currentMenu === 'main' && state.displayLines[1].includes("1) PROGRAMMING")) {
      setDisplayLines([
        "ENTER PASSWORD:",
        "",
        "",
        "<Enter> to confirm"
      ]);
    }
  }, [state.displayLines, state.passcode, state.currentMenu, setDisplayLines]);
  
  const handleEscPress = useCallback(() => {
    // Return to main screen from most screens
    setState(prev => ({
      ...prev,
      displayLines: initialState.displayLines,
      currentMenu: 'main',
      passcode: '',
      isAuthenticated: false
    }));
  }, []);
  
  const handleArrowPress = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    // Navigation logic would go here
    console.log(`Arrow pressed: ${direction}`);
  }, []);
  
  const handleFunctionPress = useCallback((func: string) => {
    switch (func) {
      case 'acknowledge':
        // Logic for acknowledging alarms/troubles
        if (state.alarm || state.trouble || state.supervisory) {
          setState(prev => ({
            ...prev,
            displayLines: [
              "ACKNOWLEDGED",
              `${state.alarm ? "ALARM" : state.trouble ? "TROUBLE" : "SUPERVISORY"}`,
              "12:00 AM 01/01/2023",
              "<Esc> to return"
            ]
          }));
        }
        break;
        
      case 'silence':
        // Logic for silencing alarms
        if (state.alarm) {
          setState(prev => ({
            ...prev,
            silenced: true,
            displayLines: [
              "ALARM SILENCED",
              "12:00 AM 01/01/2023",
              "",
              "<Esc> to return"
            ]
          }));
        }
        break;
        
      case 'reset':
        // Logic for resetting the system
        setState(prev => ({
          ...prev,
          alarm: false,
          trouble: false,
          supervisory: false,
          silenced: false,
          displayLines: [
            "SYSTEM RESET",
            "IN PROGRESS",
            "",
            "Please wait..."
          ]
        }));
        
        // Simulate reset completion after 2 seconds
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            displayLines: initialState.displayLines
          }));
        }, 2000);
        break;
        
      case 'drill':
        // Logic for fire drill
        setState(prev => ({
          ...prev,
          alarm: true,
          displayLines: [
            "FIRE DRILL ACTIVE",
            "12:00 AM 01/01/2023",
            "",
            "<Reset> to Cancel"
          ]
        }));
        break;
        
      case 'menu':
        // Show main menu
        setState(prev => ({
          ...prev,
          currentMenu: 'main',
          displayLines: [
            "MAIN MENU:",
            "1) PROGRAMMING",
            "2) HISTORY",
            "3) DIAGNOSTICS"
          ]
        }));
        break;
    }
  }, [state.alarm, state.trouble, state.supervisory]);
  
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
    
    // Function to simulate different system states for demonstration
    simulateCondition: (condition: 'alarm' | 'trouble' | 'supervisory' | 'normal') => {
      switch (condition) {
        case 'alarm':
          setState(prev => ({
            ...prev,
            alarm: true,
            displayLines: [
              "FIRE ALARM",
              "ZONE 1",
              "12:00 AM 01/01/2023",
              "<Ack> to acknowledge"
            ]
          }));
          break;
        case 'trouble':
          setState(prev => ({
            ...prev,
            trouble: true,
            displayLines: [
              "TROUBLE",
              "SMOKE DETECTOR Z1D3",
              "12:00 AM 01/01/2023",
              "<Ack> to acknowledge"
            ]
          }));
          break;
        case 'supervisory':
          setState(prev => ({
            ...prev,
            supervisory: true,
            displayLines: [
              "SUPERVISORY",
              "SPRINKLER VALVE",
              "12:00 AM 01/01/2023",
              "<Ack> to acknowledge"
            ]
          }));
          break;
        case 'normal':
          setState(prev => ({
            ...prev,
            alarm: false,
            trouble: false,
            supervisory: false,
            silenced: false,
            displayLines: initialState.displayLines
          }));
          break;
      }
    }
  };
};

export default usePanelState;
