
import React from 'react';
import { cn } from '@/lib/utils';

type PanelDisplayProps = {
  lines: string[];
  className?: string;
};

const PanelDisplay: React.FC<PanelDisplayProps> = ({ 
  lines,
  className 
}) => {
  // Ensure we always have 4 lines for the display
  const displayLines = [...lines];
  while (displayLines.length < 4) {
    displayLines.push("");
  }
  
  // Trim to 4 lines maximum
  const fourLines = displayLines.slice(0, 4);
  
  return (
    <div 
      className={cn(
        "bg-panel-display rounded-sm p-3 shadow-inner border-2 border-panel-border",
        "w-full h-36", // Fixed height to accommodate 4 lines
        className
      )}
    >
      <div className="w-full h-full flex flex-col justify-start">
        {fourLines.map((line, index) => (
          <div 
            key={index}
            className="lcd-text text-lg leading-8 whitespace-pre"
          >
            {line.padEnd(20, ' ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelDisplay;
