
// Menu structure based on MS-9600UDLS documentation
export const menuStructure = {
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

export type MenuScreen = 'main' | 'programming' | 'point' | 'zone' | 'system' | 'history' | 'maintenance' | 'read' | 'walktest';

// Panel state type definition
export type PanelState = {
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

// Initial panel state
export const initialState: PanelState = {
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
