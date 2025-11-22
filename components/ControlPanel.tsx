import React from 'react';
import { CSSPropertyControl } from '../types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface ControlPanelProps {
  controls: CSSPropertyControl[];
  values: { [key: string]: any };
  onChange: (name: string, value: any) => void;
  onExplain?: (name: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ controls, values, onChange, onExplain }) => {
  return (
    <div className="space-y-6">
      {controls.map((control) => (
        <div key={control.name} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              {control.name}
              <span className="text-xs text-slate-400 font-normal bg-slate-100 px-1.5 py-0.5 rounded">
                {control.label}
              </span>
            </label>
            {onExplain && (
              <button 
                onClick={() => onExplain(control.name)}
                className="text-indigo-500 hover:text-indigo-700 transition-colors"
                title="Ask AI to explain"
              >
                <InformationCircleIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {control.type === 'range' && (
              <>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step || 1}
                  value={values[control.name] || 0}
                  onChange={(e) => onChange(control.name, Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-xs font-mono text-slate-600 w-12 text-right">
                  {values[control.name]}{control.unit}
                </span>
              </>
            )}

            {control.type === 'select' && (
              <select
                value={values[control.name]}
                onChange={(e) => onChange(control.name, e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
              >
                {control.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {control.type === 'color' && (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="color"
                  value={values[control.name]}
                  onChange={(e) => onChange(control.name, e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border border-slate-300 p-0.5"
                />
                <span className="text-xs font-mono text-slate-500 uppercase">{values[control.name]}</span>
              </div>
            )}
            
            {control.type === 'text' && (
               <input
                  type="text"
                  value={values[control.name]}
                  onChange={(e) => onChange(control.name, e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-md p-2"
               />
            )}
          </div>
          {control.description && (
            <p className="mt-1 text-xs text-slate-500">{control.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
