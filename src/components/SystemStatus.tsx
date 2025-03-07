
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
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {/* First column */}
      <div className="space-y-2">
        <LEDIndicator 
          active={power} 
          color="normal" 
          label="AC POWER" 
          size="lg"
        />
        
        <LEDIndicator 
          active={alarm} 
          color="alarm" 
          label="FIRE ALARM" 
          blinking={alarm} 
          size="lg"
        />
        
        <LEDIndicator 
          active={supervisory} 
          color="supervisory" 
          label="SUPERVISORY"
          blinking={supervisory} 
          size="lg"
        />
        
        <LEDIndicator 
          active={trouble} 
          color="trouble" 
          label="TROUBLE" 
          blinking={trouble} 
          size="lg"
        />
      </div>
      
      {/* Second column */}
      <div className="space-y-2">
        <LEDIndicator 
          active={false} 
          color="supervisory" 
          label="MAINTENANCE" 
          size="lg"
        />
        
        <LEDIndicator 
          active={silenced} 
          color="normal" 
          label="ALARM SILENCE" 
          size="lg"
        />
        
        <LEDIndicator 
          active={false} 
          color="normal" 
          label="BATTERY" 
          size="lg"
        />
        
        <LEDIndicator 
          active={false} 
          color="normal" 
          label="GROUND" 
          size="lg"
        />
      </div>
    </div>
  );
};

export default SystemStatus;
