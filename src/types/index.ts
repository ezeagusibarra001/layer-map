export interface Section {
  id: string;
  title: string;
  category: 'backend' | 'frontend';
  color: string;
  description: string;
  responsibility: string;
  codeExample: string;
  language: string;
}

export interface Layer {
  id: string;
  name: string;
  color: string;
  position: { x: number; y: number };
  description: string;
  onClick: () => void;
}

export type SectionId = 
  | 'frontend-model' 
  | 'frontend-view' 
  | 'frontend-controller'
  | 'backend-controller' 
  | 'backend-service' 
  | 'backend-model' 
  | 'backend-persistence';