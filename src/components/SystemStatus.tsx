
import React from 'react';
import LEDIndicator from './LEDIndicator';
import { cn } from '@/lib/utils';

type SystemStatusProps = {
  power: boolean;
  alarm: boolean;
  trouble: boolean;
  supervisory: boolean;
  silenced: boolean;
  className?: string;
};

const SystemStatus: React.FC<SystemStatusProps> = ({
  power,
  alarm,
  trouble,
  supervisory,
  silenced,
  className
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-2", className)}>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-3 shadow-lg border border-panel-border">
        <h3 className="text-white text-xs uppercase tracking-wider mb-2 font-semibold text-center">System Status</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Power</span>
            <LEDIndicator 
              active={power} 
              color="normal" 
              label={power ? "AC" : "DC"} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Alarm</span>
            <LEDIndicator 
              active={alarm} 
              color="alarm" 
              blinking={alarm} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Trouble</span>
            <LEDIndicator 
              active={trouble} 
              color="trouble" 
              blinking={trouble} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Supervisory</span>
            <LEDIndicator 
              active={supervisory} 
              color="supervisory" 
              blinking={supervisory} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Silenced</span>
            <LEDIndicator 
              active={silenced} 
              color="normal" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
