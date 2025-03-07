
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
  
  // Trim to 4 lines maximum (MS-9600UDLS has a 4-line display per documentation)
  const fourLines = displayLines.slice(0, 4);
  
  return (
    <div 
      className={cn(
        "bg-panel-display rounded-sm p-3 shadow-inner border-2 border-panel-border",
        "w-full h-36", // Fixed height to accommodate 4 lines
        className
      )}
    >
      <div className="w-full h-full flex flex-col justify-start overflow-hidden">
        {fourLines.map((line, index) => (
          <div 
            key={index}
            className="lcd-text text-lg leading-8 whitespace-pre font-mono"
          >
            {/* MS-9600UDLS has a 40-character display (per line) according to documentation */}
            {line.padEnd(40, ' ').substring(0, 40)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelDisplay;
