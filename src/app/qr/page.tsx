'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function QRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a LayerMap</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo.png" 
              alt="LayerMap Logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold text-gray-900">LayerMap</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¡Accede desde tu móvil!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Escanea el código QR para acceder a LayerMap
            </p>
            <p className="text-lg text-gray-500">
              desde cualquier dispositivo
            </p>
          </div>

          {/* QR Code Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-100">
            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="w-80 h-80 mx-auto bg-white rounded-lg p-4 flex items-center justify-center">
                <Image 
                  src="/qr.png" 
                  alt="Código QR para acceder a LayerMap - https://layer-map.vercel.app/" 
                  width={288} 
                  height={288}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
            
            {/* URL Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">URL del sitio web:</p>
              <div className="flex items-center justify-center space-x-2 text-lg font-mono bg-white rounded border px-4 py-2">
                <span className="text-indigo-600">https://layer-map.vercel.app/</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ¿Cómo usar el código QR?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Abre la cámara</h3>
                <p className="text-sm text-gray-600">
                  Usa la app de cámara de tu teléfono o cualquier lector de códigos QR
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Escanea el código</h3>
                <p className="text-sm text-gray-600">
                  Apunta la cámara hacia el código QR hasta que lo detecte
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">¡Accede!</h3>
                <p className="text-sm text-gray-600">
                  Toca la notificación para abrir LayerMap en tu navegador móvil
                </p>
              </div>
            </div>
          </div>

          {/* Direct Link */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4">¿Prefieres copiar el enlace?</p>
            <a 
              href="https://layer-map.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <span>Abrir LayerMap</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-600">
            LayerMap - Visualiza tu arquitectura de software de manera interactiva
          </p>
        </div>
      </footer>
    </div>
  );
}