'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VisualMap } from '@/components/VisualMap';
import { SectionContent } from '@/components/SectionContent';
import { sections } from '@/data/sections';
import { SectionId } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { QrCode, Menu, X } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('frontend-model');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentSection = sections.find(section => section.id === activeSection);

  if (!currentSection) {
    return <div>Sección no encontrada</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsSidebarOpen(false); // Cerrar sidebar en mobile después de seleccionar
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button + Logo */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Image 
                src="/logo.png" 
                alt="LayerMap Logo" 
                width={32} 
                height={32}
                className="rounded-lg lg:w-10 lg:h-10"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
                  LayerMap
                </h1>
                <p className="text-sm lg:text-base text-gray-600 mt-1 hidden md:block">
                  Visualiza tu arquitectura de software
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs lg:text-sm text-gray-500">Sección actual</div>
                <div className="text-sm lg:text-lg font-semibold text-gray-900">
                  {currentSection.title}
                </div>
              </div>
              
              <Link 
                href="/qr"
                className="inline-flex items-center space-x-1 lg:space-x-2 bg-indigo-600 text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-xs lg:text-sm"
              >
                <QrCode className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Ver QR</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
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
