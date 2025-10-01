interface ArrowProps {
  from: { x: number; y: number }; // coordenadas en %
  to: { x: number; y: number };   // coordenadas en %
  color?: string;
  thick?: boolean;
}

export function Arrow({ from, to, color = '#6b7280', thick = false }: ArrowProps) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <marker
          id={`arrowhead-${color}`}
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={color}
        strokeWidth={thick ? 3 : 2}
        markerEnd={`url(#arrowhead-${color})`}
      />
    </svg>
  );
}