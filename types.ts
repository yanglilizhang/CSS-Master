import { CSSProperties } from 'react';

export enum ModuleCategory {
  BOX_MODEL = 'box-model',
  TYPOGRAPHY = 'typography',
  FLEXBOX = 'flexbox',
  POSITIONING = 'positioning',
  EFFECTS = 'effects',
}

export interface CSSPropertyControl {
  name: string; // CSS property name (kebab-case)
  label: string; // Chinese label
  type: 'range' | 'select' | 'color' | 'text';
  value: string | number;
  unit?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  description?: string; // Brief Chinese description
}

export interface ModuleState {
  [key: string]: string | number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
