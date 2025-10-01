'use client';

import { LayerBox } from '@/components/ui/LayerBox';
import { Arrow } from '@/components/ui/Arrow';
import { SectionId } from '@/types';

interface VisualMapProps {
  activeSection: SectionId;
  onLayerClick: (section: SectionId) => void;
}

const layers = [
  // Frontend (izquierda)
  { id: 'frontend-model' as SectionId, name: 'Model', color: 'yellow', position: { x: 25, y: 30 } },
  { id: 'frontend-view' as SectionId, name: 'View', color: 'cyan', position: { x: 25, y: 50 } },
  { id: 'frontend-controller' as SectionId, name: 'Controller', color: 'pink', position: { x: 25, y: 70 } },

  // Backend (derecha) - reorganizado para no ser una columna
  { id: 'backend-controller' as SectionId, name: 'Controller', color: 'blue', position: { x: 75, y: 30 } },
  { id: 'backend-service' as SectionId, name: 'Service', color: 'green', position: { x: 75, y: 50 } },
  { id: 'backend-model' as SectionId, name: 'Model', color: 'orange', position: { x: 65, y: 70 } },
  { id: 'backend-persistence' as SectionId, name: 'Persistence', color: 'red', position: { x: 85, y: 70 } },
];

const connections = [
  // Frontend MVC
  { from: { x: 25, y: 50 }, to: { x: 25, y: 70 }, color: '#ec4899' }, // View -> Controller
  { from: { x: 25, y: 70 }, to: { x: 25, y: 30 }, color: '#ec4899' }, // Controller -> Model

  // Frontend Controller <-> Backend Controller (con DTOs) - tocando las cajas
  { from: { x: 25, y: 70 }, to: { x: 75, y: 30 }, color: '#6366f1', thick: true, label: 'DTOs' },

  // Backend Controller -> Service
  { from: { x: 75, y: 30 }, to: { x: 75, y: 50 }, color: '#3b82f6' },

  // Backend Service -> Model
  { from: { x: 75, y: 50 }, to: { x: 65, y: 70 }, color: '#10b981' },

  // Backend Service -> Persistence  
  { from: { x: 75, y: 50 }, to: { x: 85, y: 70 }, color: '#10b981' },

  // Backend Model <-> Persistence (conexión bidireccional)
  { from: { x: 65, y: 70 }, to: { x: 85, y: 70 }, color: '#f97316' },
  { from: { x: 85, y: 70 }, to: { x: 65, y: 70 }, color: '#f97316' },
];

export function VisualMap({ activeSection, onLayerClick }: VisualMapProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Mapa Visual de Arquitectura
        </h2>
        <p className="text-gray-600 text-sm">
          Haz clic en cualquier capa para explorar ejemplos de código
        </p>
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] p-8">
        {/* Section Labels */}
        <div className="absolute top-4 left-8">
          <span className="text-sm font-semibold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-lg">
            Frontend
          </span>
        </div>
        
        <div className="absolute top-4 right-8">
          <span className="text-sm font-semibold text-blue-800 bg-blue-100 px-3 py-1 rounded-lg">
            Backend
          </span>
        </div>

        {/* Arrows */}
        {connections.map((connection, index) => (
          <Arrow key={index} {...connection} />
        ))}

        {/* Layers */}
        {layers.map((layer) => (
          <LayerBox
            key={layer.id}
            name={layer.name}
            color={layer.color}
            position={layer.position}
            onClick={() => onLayerClick(layer.id)}
            isActive={activeSection === layer.id}
          />
        ))}
      </div>
    </div>
  );
}