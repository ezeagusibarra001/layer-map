interface ArrowProps {
  from: { x: number; y: number }; // coordenadas en %
  to: { x: number; y: number };   // coordenadas en %
  color?: string;
  thick?: boolean;
  label?: string; // Nueva prop para texto en la flecha
}

export function Arrow({ from, to, color = '#6b7280', thick = false, label }: ArrowProps) {
  // Calcular punto medio para el texto
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Calcular ángulo de rotación basado en la dirección de la flecha
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

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
      {label && (
        <g transform={`rotate(${angle} ${midX}% ${midY}%)`}>
          {/* Fondo blanco para el texto */}
          <rect
            x={`${midX - 2}%`}
            y={`${midY}%`}
            dy="-12"
            width="4%"
            height="24"
            fill="white"
            stroke={color}
            strokeWidth="1"
            rx="3"
            transform="translate(0, -12)"
          />
          <text
            x={`${midX}%`}
            y={`${midY}%`}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold"
            style={{ 
              fill: color,
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {label}
          </text>
        </g>
      )}
    </svg>
  );
}