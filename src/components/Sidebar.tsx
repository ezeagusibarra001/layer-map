'use client';

import { clsx } from 'clsx';
import { ChevronRight, Database, Globe, Layers, Server } from 'lucide-react';
import { SectionId } from '@/types';

interface SidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const menuItems = [
  {
    category: 'Frontend',
    icon: Globe,
    color: 'text-yellow-600',
    items: [
      { id: 'frontend-model' as SectionId, title: 'Model', color: 'text-yellow-600' },
      { id: 'frontend-view' as SectionId, title: 'View', color: 'text-cyan-600' },
      { id: 'frontend-controller' as SectionId, title: 'Controller', color: 'text-pink-600' },
    ]
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'text-blue-600',
    items: [
      { id: 'backend-controller' as SectionId, title: 'Controller', color: 'text-blue-600' },
      { id: 'backend-service' as SectionId, title: 'Service', color: 'text-green-600' },
      { id: 'backend-model' as SectionId, title: 'Model', color: 'text-orange-600' },
      { id: 'backend-persistence' as SectionId, title: 'Persistence', color: 'text-red-600' },
    ]
  }
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Layers className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">LayerMap</h1>
            <p className="text-sm text-gray-600">Arquitectura de Software</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {menuItems.map((group) => (
            <div key={group.category}>
              {/* Category Header */}
              <div className="flex items-center space-x-2 mb-3">
                <group.icon className={clsx('w-5 h-5', group.color)} />
                <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {group.category}
                </h2>
              </div>

              {/* Category Items */}
              <div className="space-y-1 ml-7">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={clsx(
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200',
                      'flex items-center justify-between group',
                      activeSection === item.id
                        ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <span className="flex items-center space-x-2">
                      <div className={clsx('w-2 h-2 rounded-full', 
                        item.color.replace('text-', 'bg-')
                      )} />
                      <span>{item.title}</span>
                    </span>
                    <ChevronRight className={clsx(
                      'w-4 h-4 transition-transform duration-200',
                      activeSection === item.id 
                        ? 'transform rotate-90 text-indigo-600' 
                        : 'text-gray-400 group-hover:text-gray-600'
                    )} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Desarrollado para aprender</p>
          <p>arquitectura de software</p>
        </div>
      </div>
    </aside>
  );
}