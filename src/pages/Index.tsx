
import React, { useState } from 'react';
import PanelDisplay from '@/components/PanelDisplay';
import KeyPad from '@/components/KeyPad';
import SystemStatus from '@/components/SystemStatus';
import usePanelState from '@/hooks/usePanelState';
import { AlertTriangle, Info, Fire } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
          Fire-lite MS-9600UDLS Simulator
        </h1>
        <p className="text-center text-gray-600 mb-8">Training simulator for fire alarm technicians</p>
        
        <div className="bg-panel-background rounded-xl p-4 md:p-6 shadow-2xl border border-panel-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column with system status and demo controls */}
            <div className="space-y-4">
              <SystemStatus
                power={power}
                alarm={alarm}
                trouble={trouble}
                supervisory={supervisory}
                silenced={silenced}
              />
              
              {/* Demo controls */}
              <div className="bg-gray-800 rounded-lg p-3 border border-panel-border">
                <h3 className="text-white text-xs uppercase tracking-wider mb-3 font-semibold text-center">
                  Simulation Controls
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => simulateCondition('alarm')}
                    className="flex items-center justify-center px-3 py-2 bg-panel-alarm bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100"
                  >
                    <Fire size={14} className="mr-1" />
                    Fire Alarm
                  </button>
                  
                  <button 
                    onClick={() => simulateCondition('trouble')}
                    className="flex items-center justify-center px-3 py-2 bg-panel-trouble bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100"
                  >
                    <AlertTriangle size={14} className="mr-1" />
                    Trouble
                  </button>
                  
                  <button 
                    onClick={() => simulateCondition('supervisory')}
                    className="flex items-center justify-center px-3 py-2 bg-panel-supervisory bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100"
                  >
                    <Info size={14} className="mr-1" />
                    Supervisory
                  </button>
                  
                  <button 
                    onClick={() => simulateCondition('normal')}
                    className="flex items-center justify-center px-3 py-2 bg-panel-normal bg-opacity-90 text-white text-sm font-semibold rounded transition-all hover:bg-opacity-100"
                  >
                    Reset System
                  </button>
                </div>
              </div>
            </div>
            
            {/* Center column with display and keypad */}
            <div className="md:col-span-2 space-y-6">
              {/* Panel branding */}
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-white">Fire-Lite</div>
                <div className="text-xs text-white bg-black bg-opacity-30 px-2 py-1 rounded">
                  MS-9600UDLS
                </div>
              </div>
              
              {/* LCD Display */}
              <PanelDisplay lines={displayLines} />
              
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
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>This is a training simulator only. Not for use in actual fire alarm systems.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
