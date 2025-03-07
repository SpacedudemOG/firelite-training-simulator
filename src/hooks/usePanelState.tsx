
import { useState, useCallback, useEffect } from 'react';

type MenuScreen = 'main' | 'programming' | 'point' | 'zone' | 'system' | 'history' | 'maintenance' | 'read' | 'walktest';

// More accurate panel state based on MS-9600UDLS documentation
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
  menuLevel: number;
  currentMenuItems: string[];
  selectedMenuItem: number;
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
  isAuthenticated: false,
  menuLevel: 0,
  currentMenuItems: [],
  selectedMenuItem: 0
};

// Main menu structure based on MS-9600UDLS documentation
const menuStructure = {
  main: [
    "1) PROGRAMMING",
    "2) READ STATUS",
    "3) SYSTEM POINT",
    "4) MAINTENANCE"
  ],
  programming: [
    "1) AUTOPROGRAM",
    "2) POINT PROGRAM",
    "3) ZONE SETUP",
    "4) LOOP SETUP",
    "5) SYSTEM SETUP",
    "6) VERIFY LOOPS",
    "7) HISTORY",
    "8) WALKTEST"
  ],
  read: [
    "1) POINT READ",
    "2) ZONE READ", 
    "3) POWER",
    "4) TROUBLE REMINDER",
    "5) HISTORY",
    "6) ANN-BUS",
    "7) PRINT"
  ],
  maintenance: [
    "1) DISABLE",
    "2) HISTORY",
    "3) PROGRAM CHECK",
    "4) WALKTEST",
    "5) SYSTEM",
    "6) ZONE SETUP"
  ]
};

const usePanelState = () => {
  const [state, setState] = useState<PanelState>(initialState);
  
  const setDisplayLines = useCallback((lines: string[]) => {
    setState(prev => ({ ...prev, displayLines: lines }));
  }, []);

  // Handle menu navigation based on number selection
  const navigateMenu = useCallback((selection: number) => {
    // Different behavior based on current menu context
    if (state.currentMenu === 'main' && state.isAuthenticated) {
      switch(selection) {
        case 1: // Programming
          setState(prev => ({
            ...prev,
            currentMenu: 'programming',
            displayLines: [
              "PROGRAMMING MENU:",
              ...menuStructure.programming.slice(0, 4),
              "<Scroll> for more"
            ]
          }));
          break;
        case 2: // Read Status
          setState(prev => ({
            ...prev,
            currentMenu: 'read',
            displayLines: [
              "READ STATUS MENU:",
              ...menuStructure.read.slice(0, 4),
              "<Scroll> for more"
            ]
          }));
          break;
        case 3: // System Point
          setState(prev => ({
            ...prev,
            displayLines: [
              "SYSTEM POINT FUNCTIONS",
              "UNDER DEVELOPMENT",
              "",
              "<Esc> to return"
            ]
          }));
          break;
        case 4: // Maintenance
          setState(prev => ({
            ...prev,
            currentMenu: 'maintenance',
            displayLines: [
              "MAINTENANCE MENU:",
              ...menuStructure.maintenance.slice(0, 4),
              "<Scroll> for more"
            ]
          }));
          break;
      }
    }
    // Handle programming menu selections
    else if (state.currentMenu === 'programming') {
      setState(prev => ({
        ...prev,
        displayLines: [
          `SELECTED OPTION ${selection}`,
          "FUNCTION UNDER",
          "DEVELOPMENT",
          "<Esc> to return"
        ]
      }));
    }
    // Handle read status menu selections
    else if (state.currentMenu === 'read') {
      setState(prev => ({
        ...prev,
        displayLines: [
          `SELECTED OPTION ${selection}`,
          "FUNCTION UNDER",
          "DEVELOPMENT",
          "<Esc> to return"
        ]
      }));
    }
    // Handle maintenance menu selections
    else if (state.currentMenu === 'maintenance') {
      setState(prev => ({
        ...prev,
        displayLines: [
          `SELECTED OPTION ${selection}`,
          "FUNCTION UNDER",
          "DEVELOPMENT",
          "<Esc> to return"
        ]
      }));
    }
  }, [state.currentMenu, state.isAuthenticated]);
  
  const handleNumberPress = useCallback((num: number) => {
    // Password entry mode
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
    // Menu navigation mode
    else if (state.isAuthenticated || state.currentMenu === 'main') {
      // Check if number is a valid menu option
      navigateMenu(num);
    }
  }, [state.displayLines, state.passcode, state.isAuthenticated, state.currentMenu, setDisplayLines, navigateMenu]);
  
  const handleEnterPress = useCallback(() => {
    // Password validation logic
    if (state.displayLines[0].includes("ENTER PASSWORD")) {
      // Password from MS-9600UDLS documentation: default is often 00000
      if (state.passcode === "00000" || state.passcode === "1234") {
        setState(prev => ({ 
          ...prev, 
          isAuthenticated: true,
          passcode: ''
        }));
        
        // Show main menu after authentication
        setDisplayLines([
          "MAIN MENU:",
          ...menuStructure.main
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
    // Handle selection confirmation in menus
    else if (state.currentMenu === 'main' && !state.isAuthenticated) {
      setDisplayLines([
        "ENTER PASSWORD:",
        "",
        "",
        "<Enter> to confirm"
      ]);
    }
  }, [state.displayLines, state.passcode, state.currentMenu, state.isAuthenticated, setDisplayLines, menuStructure]);
  
  const handleEscPress = useCallback(() => {
    // Return logic varies based on menu context
    if (state.currentMenu !== 'main' && state.isAuthenticated) {
      // Return to main menu from submenus
      setState(prev => ({
        ...prev,
        currentMenu: 'main',
        displayLines: [
          "MAIN MENU:",
          ...menuStructure.main
        ]
      }));
    } else {
      // Return to system normal display
      setState(prev => ({
        ...prev,
        displayLines: initialState.displayLines,
        currentMenu: 'main',
        passcode: '',
        isAuthenticated: false
      }));
    }
  }, [state.currentMenu, state.isAuthenticated]);
  
  const handleArrowPress = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    // Scrolling through menu options
    if (state.isAuthenticated) {
      if (direction === 'up' || direction === 'down') {
        let menuItems: string[] = [];
        
        // Get the appropriate menu items
        if (state.currentMenu === 'main') {
          menuItems = menuStructure.main;
        } else if (state.currentMenu === 'programming') {
          menuItems = menuStructure.programming;
        } else if (state.currentMenu === 'read') {
          menuItems = menuStructure.read;
        } else if (state.currentMenu === 'maintenance') {
          menuItems = menuStructure.maintenance;
        }
        
        // Scroll up or down
        if (direction === 'down' && menuItems.length > 4) {
          const currentFirstItem = state.displayLines.findIndex(line => line.match(/^\d\)/));
          const currentItemNumber = parseInt(state.displayLines[currentFirstItem].charAt(0));
          
          if (currentItemNumber + 3 < menuItems.length) {
            setDisplayLines([
              state.displayLines[0], // Keep the title
              ...menuItems.slice(currentItemNumber, currentItemNumber + 4),
              "<Scroll> for more"
            ]);
          }
        } else if (direction === 'up' && menuItems.length > 4) {
          const currentFirstItem = state.displayLines.findIndex(line => line.match(/^\d\)/));
          const currentItemNumber = parseInt(state.displayLines[currentFirstItem].charAt(0));
          
          if (currentItemNumber > 1) {
            setDisplayLines([
              state.displayLines[0], // Keep the title
              ...menuItems.slice(currentItemNumber - 2, currentItemNumber + 2),
              "<Scroll> for more"
            ]);
          }
        }
      }
    }
  }, [state.isAuthenticated, state.currentMenu, state.displayLines, setDisplayLines]);
  
  const handleFunctionPress = useCallback((func: string) => {
    switch (func) {
      case 'acknowledge':
        // Logic for acknowledging alarms/troubles
        if (state.alarm || state.trouble || state.supervisory) {
          setState(prev => ({
            ...prev,
            displayLines: [
              "ACKNOWLEDGE",
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
        // Show main menu - if not authenticated, will prompt for password
        if (state.isAuthenticated) {
          setState(prev => ({
            ...prev,
            currentMenu: 'main',
            displayLines: [
              "MAIN MENU:",
              ...menuStructure.main
            ]
          }));
        } else {
          setState(prev => ({
            ...prev,
            currentMenu: 'main',
            displayLines: [
              "ENTER PASSWORD:",
              "",
              "",
              "<Enter> to confirm"
            ]
          }));
        }
        break;
    }
  }, [state.alarm, state.trouble, state.supervisory, state.isAuthenticated]);
  
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
              "DETECTOR L01D01",
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
              "OPEN CIRCUIT L01M03",
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
              "TAMPER SWITCH L01M02",
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
