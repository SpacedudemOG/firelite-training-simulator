
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

type KeyPadProps = {
  onNumberPress: (num: number) => void;
  onEnterPress: () => void;
  onEscPress: () => void;
  onArrowPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onFunctionPress: (func: string) => void;
  className?: string;
};

const KeyPad: React.FC<KeyPadProps> = ({
  onNumberPress,
  onEnterPress,
  onEscPress,
  onArrowPress,
  onFunctionPress,
  className
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Numeric keypad */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            className={cn(
              "numeric-button", 
              num === 0 ? "col-start-2" : ""
            )}
            onClick={() => onNumberPress(num)}
          >
            {num}
          </button>
        ))}
      </div>
      
      {/* Navigation keys */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          className="navigation-button col-start-2"
          onClick={() => onArrowPress('up')}
        >
          <ChevronUp size={18} className="mx-auto" />
        </button>
        
        <div className="grid grid-cols-3 col-span-3 gap-2">
          <button 
            className="navigation-button"
            onClick={() => onArrowPress('left')}
          >
            <ChevronLeft size={18} className="mx-auto" />
          </button>
          
          <button 
            className="navigation-button"
            onClick={() => onEnterPress()}
          >
            Enter
          </button>
          
          <button 
            className="navigation-button"
            onClick={() => onArrowPress('right')}
          >
            <ChevronRight size={18} className="mx-auto" />
          </button>
        </div>
        
        <button 
          className="navigation-button col-start-2"
          onClick={() => onArrowPress('down')}
        >
          <ChevronDown size={18} className="mx-auto" />
        </button>
      </div>
      
      {/* Function keys */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          className="function-button"
          onClick={() => onEscPress()}
        >
          ESC
        </button>
        
        <button 
          className="function-button"
          onClick={() => onFunctionPress('acknowledge')}
        >
          ACK
        </button>
        
        <button 
          className="function-button"
          onClick={() => onFunctionPress('silence')}
        >
          Silence
        </button>
        
        <button 
          className="function-button"
          onClick={() => onFunctionPress('reset')}
        >
          Reset
        </button>
        
        <button 
          className="function-button"
          onClick={() => onFunctionPress('drill')}
        >
          Drill
        </button>
        
        <button 
          className="function-button"
          onClick={() => onFunctionPress('menu')}
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default KeyPad;
