'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VisualMap } from '@/components/VisualMap';
import { SectionContent } from '@/components/SectionContent';
import { sections } from '@/data/sections';
import { SectionId } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { QrCode } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('frontend-model');
  
  const currentSection = sections.find(section => section.id === activeSection);

  if (!currentSection) {
    return <div>Sección no encontrada</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image 
                src="/logo.png" 
                alt="LayerMap Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  LayerMap - Visualiza tu arquitectura de software
                </h1>
                <p className="text-gray-600 mt-1">
                  Guía interactiva para entender las capas de arquitectura backend y frontend
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-right">
                <div className="text-sm text-gray-500">Sección actual</div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentSection.title}
                </div>
              </div>
              
              <Link 
                href="/qr"
                className="ml-4 inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Ver QR</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Visual Map */}
            <VisualMap 
              activeSection={activeSection}
              onLayerClick={setActiveSection}
            />

            {/* Section Content */}
            <SectionContent section={currentSection} />
          </div>
        </div>
      </main>
    </div>
  );
}
