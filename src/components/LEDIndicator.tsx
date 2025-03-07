
import React from 'react';
import { cn } from '@/lib/utils';

type LEDIndicatorProps = {
  active: boolean;
  color: 'alarm' | 'trouble' | 'supervisory' | 'normal';
  blinking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
};

const LEDIndicator: React.FC<LEDIndicatorProps> = ({
  active,
  color,
  blinking = false,
  size = 'md',
  label,
  className
}) => {
  const sizeClass = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const colorClass = {
    alarm: 'bg-red-500',
    trouble: 'bg-yellow-400',
    supervisory: 'bg-yellow-300',
    normal: 'bg-green-500'
  };
  
  const blinkingClass = blinking ? (
    color === 'alarm' ? 'animate-blink-fast' : 'animate-blink-slow'
  ) : '';

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full transition-all duration-300",
          sizeClass[size],
          active ? colorClass[color] : "bg-gray-600 opacity-30",
          active && blinking && blinkingClass,
          "shadow-[0_0_5px_rgba(0,0,0,0.2)]"
        )}
      />
      {label && (
        <span className="text-xs font-medium text-gray-200 uppercase">
          {label}
        </span>
      )}
    </div>
  );
};

export default LEDIndicator;
