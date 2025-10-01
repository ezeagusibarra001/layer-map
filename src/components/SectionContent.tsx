"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Section } from "@/types";
import { AlertCircle, BookOpen, Code, Target } from "lucide-react";

interface SectionContentProps {
  section: Section;
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  cyan: {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    dot: "bg-pink-500",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
  },
};

export function SectionContent({ section }: SectionContentProps) {
  const colors =
    colorMap[section.color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div
        className={`${colors.bg} ${colors.border} border rounded-xl p-4 lg:p-6 mb-6 lg:mb-8`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full ${colors.dot}`} />
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900">{section.title}</h1>
          <span
            className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {section.category.toUpperCase()}
          </span>
        </div>
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          {section.description}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Responsibility */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 h-full shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              <h3 className="text-sm lg:text-base font-semibold text-gray-900">Responsabilidades</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {section.responsibility}
            </p>
          </div>
        </div>

        {/* Best Practices */}
        <div className="lg:col-span-2 hidden">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Principios Clave</h3>
            </div>
            <div className="space-y-3">
              {getBestPractices(section.id).map((practice, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{practice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Ejemplo de Código</h3>
        </div>
        <CodeBlock code={section.codeExample} language={section.language} />
      </div>

      {/* Meme Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">
            {getMemeContent(section.id).title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {getMemeContent(section.id).subtitle}
        </p>
        <img
          src={getMemeContent(section.id).imageUrl}
          alt={getMemeContent(section.id).alt}
          className="mx-auto rounded-lg border border-gray-300 max-w-sm"
        />
      </div>
    </div>
  );
}

function getBestPractices(sectionId: string): string[] {
  const practices: Record<string, string[]> = {
    "frontend-model": [
      "Mantén el estado local cuando sea posible",
      "Valida datos en el cliente antes de enviarlos",
      "Usa hooks personalizados para lógica reutilizable",
      "Separa el estado de UI del estado de dominio",
    ],
    "frontend-view": [
      "Componentes deben ser solo presentacionales",
      "Reciben datos como props, emiten eventos",
      "No contienen lógica de negocio",
      "Enfócate en la experiencia del usuario",
    ],
    "frontend-controller": [
      "Coordina Model y View, no los implementa",
      "Maneja eventos del usuario y los traduce a acciones",
      "Se comunica con el backend via APIs",
      "Mantén los controladores ligeros y enfocados",
    ],
    "backend-controller": [
      "Solo recibe requests y devuelve responses",
      "Valida entrada pero delega la lógica",
      "Transforma DTOs, no contiene reglas de negocio",
      "Maneja errores HTTP apropiadamente",
    ],
    "backend-service": [
      "Actúa como coordinador, no como contenedor de lógica",
      "Maneja transacciones y efectos secundarios",
      "Delega la lógica de negocio al modelo",
      "Orquesta llamadas entre diferentes capas",
    ],
    "backend-model": [
      "Toda la lógica de negocio debe vivir aquí",
      "Usa factory methods para creación con validación",
      "Encapsula comportamientos y reglas del dominio",
      "Mantén la inmutabilidad cuando sea posible",
    ],
    "backend-persistence": [
      "Solo operaciones CRUD, sin lógica de negocio",
      "Abstrae la tecnología de base de datos",
      "Usa el patrón Repository para testabilidad",
      "Separa queries complejas en métodos específicos",
    ],
  };

  return (
    practices[sectionId] || [
      "Sigue los principios SOLID",
      "Mantén el código limpio y legible",
      "Escribe tests para validar comportamiento",
      "Documenta las decisiones arquitectónicas",
    ]
  );
}

function getMemeContent(sectionId: string): {
  title: string;
  subtitle: string;
  imageUrl: string;
  alt: string;
} {
  const memes: Record<
    string,
    { title: string; subtitle: string; imageUrl: string; alt: string }
  > = {
    "frontend-model": {
      title: "Estado del Frontend",
      subtitle: "Mi Redux store con 300 reducers y 20 middlewares 🔥",
      imageUrl: "/memes/model.png",
      alt: "Frontend state management this is fine meme",
    },
    "frontend-view": {
      title: "Componentes React",
      subtitle: "Solo mostrar datos, nada más... ¿verdad? 🎭",
      imageUrl: "/memes/view.png",
      alt: "Meme starter pack de componentes React mostrando props, hooks y JSX",
    },
    "frontend-controller": {
      title: "Controlador Frontend",
      subtitle: "Coordinando vuelos entre Model ✈️ y View 🛬",
      imageUrl: "/memes/controller-air-traffic.png",
      alt: "Controlador aéreo guiando tráfico entre Vista y Modelo",
    },
    "backend-controller": {
      title: "Yo explicando mi controller",
      subtitle: "Literalmente solo hago return res.json(data) 🥱",
      imageUrl: "/memes/controller-boring.png",
      alt: "Meme explicación aburrida de controller",
    },
    "backend-service": {
      title: "Capa de Servicio",
      subtitle:
        "Un service nunca hace las cosas directamente… solo da las órdenes. 🕴️",
      imageUrl: "/memes/backend-service-godfather.png",
      alt: "Backend service layer as The Godfather meme",
    },
    "backend-model": {
      title: "Modelo de Dominio",
      subtitle:
        "Cuando tu modelo no es solo getters y setters, sino reglas de negocio 🧠",
      imageUrl: "/memes/backend-model-michael-scott.png",
      alt: "Meme de Michael Scott 'You have no idea how high I can fly' aplicado al domain model",
    },
    "backend-persistence": {
      title: "Persistencia Gandalf",
      subtitle: "Defendiendo la capa: ¡aquí solo se guarda y se lee! ⚔️",
      imageUrl: "/memes/persistence-gandalf-crud.png",
      alt: "Meme Gandalf impidiendo meter lógica en persistencia",
    },
  };

  return (
    memes[sectionId] || {
      title: "Momento de Relajación",
      subtitle: "Porque el aprendizaje también debe ser divertido 😄",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblcUew64NL3iprlAX0PdgQNS13VbLrFlGUg&s",
      alt: "Programming meme",
    }
  );
}
