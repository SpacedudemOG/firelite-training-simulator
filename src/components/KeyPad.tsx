
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
      {/* Numeric keypad layout following the image */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
            onClick={() => onNumberPress(num)}
          >
            {num}
          </button>
        ))}
        
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onNumberPress(0)}
        >
          0
        </button>
        
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onEscPress()}
        >
          *
        </button>
        
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onNumberPress(0)}
        >
          #
        </button>
      </div>
      
      {/* Navigation keys arranged as in the image with blue background */}
      <div className="grid grid-cols-3 gap-2">
        {/* First row - empty, up, empty */}
        <div></div>
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onArrowPress('up')}
        >
          <ChevronUp size={18} className="mx-auto" />
        </button>
        <div></div>
        
        {/* Second row - left, enter, right */}
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onArrowPress('left')}
        >
          <ChevronLeft size={18} className="mx-auto" />
        </button>
        
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onEnterPress()}
        >
          Enter
        </button>
        
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onArrowPress('right')}
        >
          <ChevronRight size={18} className="mx-auto" />
        </button>
        
        {/* Third row - empty, down, empty */}
        <div></div>
        <button 
          className="bg-blue-900 text-white p-3 rounded shadow-lg border border-blue-950 hover:bg-blue-800 active:bg-blue-700"
          onClick={() => onArrowPress('down')}
        >
          <ChevronDown size={18} className="mx-auto" />
        </button>
        <div></div>
      </div>
      
      {/* Function keys with red background as shown in the image */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          className="bg-red-600 text-white p-3 rounded shadow-lg border border-red-700 hover:bg-red-500 active:bg-red-400 font-semibold"
          onClick={() => onFunctionPress('acknowledge')}
        >
          ACK
        </button>
        
        <button 
          className="bg-red-600 text-white p-3 rounded shadow-lg border border-red-700 hover:bg-red-500 active:bg-red-400 font-semibold"
          onClick={() => onFunctionPress('silence')}
        >
          Silence
        </button>
        
        <button 
          className="bg-red-600 text-white p-3 rounded shadow-lg border border-red-700 hover:bg-red-500 active:bg-red-400 font-semibold"
          onClick={() => onFunctionPress('drill')}
        >
          Drill
        </button>
        
        <button 
          className="bg-red-600 text-white p-3 rounded shadow-lg border border-red-700 hover:bg-red-500 active:bg-red-400 font-semibold"
          onClick={() => onFunctionPress('reset')}
        >
          Reset
        </button>
      </div>

      {/* Menu/Escape button */}
      <button 
        className="bg-yellow-500 text-black p-3 rounded shadow-lg border border-yellow-600 hover:bg-yellow-400 active:bg-yellow-300 font-semibold"
        onClick={() => onFunctionPress('menu')}
      >
        Menu
      </button>
    </div>
  );
};

export default KeyPad;
