
import React from 'react';
import PanelDisplay from '@/components/PanelDisplay';
import KeyPad from '@/components/KeyPad';
import SystemStatus from '@/components/SystemStatus';
import usePanelState from '@/hooks/usePanelState';
import { AlertTriangle, Info, Flame } from 'lucide-react';

const Index = () => {
  const { 
    displayLines, 
    power, 
    alarm, 
    trouble, 
    supervisory, 
    silenced,
    handleNumberPress,
    handleEnterPress,
    handleEscPress,
    handleArrowPress,
    handleFunctionPress,
    simulateCondition
  } = usePanelState();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-200">
          Fire-lite MS-9600UDLS Simulator
        </h1>
        <p className="text-center text-gray-400 mb-8">Training simulator for fire alarm technicians</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Panel body */}
          <div className="bg-blue-950 rounded-xl p-6 shadow-2xl border-2 border-gray-700 flex-grow">
            <div className="flex flex-col gap-6">
              {/* Panel header with branding */}
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">Fire-Lite</div>
                <div className="text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  MS-9600UDLS
                </div>
              </div>
              
              {/* LCD Display */}
              <PanelDisplay lines={displayLines} />
              
              {/* Status LEDs */}
              <SystemStatus
                power={power}
                alarm={alarm}
                trouble={trouble}
                supervisory={supervisory}
                silenced={silenced}
              />
              
              {/* Keypad */}
              <KeyPad
                onNumberPress={handleNumberPress}
                onEnterPress={handleEnterPress}
                onEscPress={handleEscPress}
                onArrowPress={handleArrowPress}
                onFunctionPress={handleFunctionPress}
              />
            </div>
          </div>
          
          {/* Simulation controls panel */}
          <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-700 md:w-64">
            <h3 className="text-white text-sm uppercase tracking-wider mb-4 font-semibold text-center">
              Simulation Controls
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => simulateCondition('alarm')}
                className="flex items-center justify-center px-3 py-2 bg-red-600 bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100 w-full"
              >
                <Flame size={14} className="mr-1" />
                Fire Alarm
              </button>
              
              <button 
                onClick={() => simulateCondition('trouble')}
                className="flex items-center justify-center px-3 py-2 bg-yellow-500 bg-opacity-90 text-black text-sm font-semibold rounded transition-all hover:bg-opacity-100 w-full"
              >
                <AlertTriangle size={14} className="mr-1" />
                Trouble
              </button>
              
              <button 
                onClick={() => simulateCondition('supervisory')}
                className="flex items-center justify-center px-3 py-2 bg-yellow-300 bg-opacity-90 text-black text-sm font-semibold rounded transition-all hover:bg-opacity-100 w-full"
              >
                <Info size={14} className="mr-1" />
                Supervisory
              </button>
              
              <button 
                onClick={() => simulateCondition('normal')}
                className="flex items-center justify-center px-3 py-2 bg-green-500 bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100 w-full"
              >
                Reset System
              </button>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="text-white text-xs uppercase tracking-wider mb-2 font-semibold text-center">
                Panel Information
              </h3>
              <div className="text-gray-300 text-xs space-y-1">
                <p><span className="text-white font-medium">Model:</span> MS-9600UDLS</p>
                <p><span className="text-white font-medium">Default Password:</span> 00000 or 1234</p>
                <p><span className="text-white font-medium">Zones:</span> 99 Software / 9 NAC</p>
                <p><span className="text-white font-medium">Points:</span> 318 per SLC loop</p>
                <p><span className="text-white font-medium">SLC Loops:</span> 1 Standard, 2 Optional</p>
              </div>
              
              <div className="p-2 bg-black bg-opacity-30 rounded mt-4 text-xs text-gray-400">
                <p>This is a training simulator only. Not for use in actual fire alarm systems.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Based on the <a href="https://buildings.honeywell.com/content/dam/hbtbt/en/documents/document-lists/firelite/discontinued-products/51335.pdf" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Fire-lite MS-9600UDLS technical documentation</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
