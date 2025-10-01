import { clsx } from 'clsx';

interface LayerBoxProps {
  name: string;
  color: string;
  position: { x: number; y: number };
  onClick: () => void;
  isActive?: boolean;
}

const colorMap = {
  blue: 'bg-blue-500 hover:bg-blue-600 border-blue-600',
  green: 'bg-green-500 hover:bg-green-600 border-green-600',
  orange: 'bg-orange-500 hover:bg-orange-600 border-orange-600',
  red: 'bg-red-500 hover:bg-red-600 border-red-600',
  purple: 'bg-purple-500 hover:bg-purple-600 border-purple-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-600',
  cyan: 'bg-cyan-500 hover:bg-cyan-600 border-cyan-600',
  pink: 'bg-pink-500 hover:bg-pink-600 border-pink-600',
  indigo: 'bg-indigo-500 hover:bg-indigo-600 border-indigo-600',
};

export function LayerBox({ name, color, position, onClick, isActive }: LayerBoxProps) {
  return (
    <div
      className={clsx(
        'absolute cursor-pointer transition-all duration-300 transform hover:scale-105',
        'px-5 py-3 rounded-lg border-2 text-white font-semibold shadow-md hover:shadow-lg',
        'min-w-[120px] text-center text-sm',
        colorMap[color as keyof typeof colorMap] || 'bg-gray-500 hover:bg-gray-600 border-gray-600',
        isActive && 'ring-3 ring-white ring-opacity-70 scale-110'
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
      }}
      onClick={onClick}
    >
      {name}
    </div>
  );
}