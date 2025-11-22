import React, { useState, useMemo } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { CodeViewer } from '../components/CodeViewer';
import { CSSPropertyControl } from '../types';

interface Props {
  onExplain: (prop: string, val: string, context: string) => void;
}

export const BoxModelModule: React.FC<Props> = ({ onExplain }) => {
  const [values, setValues] = useState<{[key: string]: any}>({
    'width': 200,
    'height': 100,
    'padding': 20,
    'border-width': 5,
    'margin': 20,
    'box-sizing': 'content-box'
  });

  const controls: CSSPropertyControl[] = [
    { name: 'box-sizing', label: '盒模型计算方式', type: 'select', options: ['content-box', 'border-box'], value: 'content-box', description: 'content-box: 宽高只包含内容; border-box: 宽高包含边框和内边距' },
    { name: 'width', label: '宽度', type: 'range', min: 100, max: 400, step: 10, value: 200, unit: 'px' },
    { name: 'height', label: '高度', type: 'range', min: 50, max: 200, step: 10, value: 100, unit: 'px' },
    { name: 'padding', label: '内边距', type: 'range', min: 0, max: 50, step: 5, value: 20, unit: 'px' },
    { name: 'border-width', label: '边框宽度', type: 'range', min: 0, max: 20, step: 1, value: 5, unit: 'px' },
    { name: 'margin', label: '外边距', type: 'range', min: 0, max: 50, step: 5, value: 20, unit: 'px' },
  ];

  const styles = {
    width: `${values['width']}px`,
    height: `${values['height']}px`,
    padding: `${values['padding']}px`,
    border: `${values['border-width']}px solid #6366f1`,
    margin: `${values['margin']}px`,
    boxSizing: values['box-sizing'] as any,
    backgroundColor: '#e0e7ff',
    transition: 'all 0.3s ease'
  };

  const cssString = useMemo(() => {
    return Object.entries(styles).map(([key, val]) => {
       // Convert camelCase to kebab-case for display
       const kebab = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
       return `\n  ${kebab}: ${val};`;
    }).join('');
  }, [styles]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">属性调节</h3>
          <ControlPanel 
            controls={controls} 
            values={values} 
            onChange={(n, v) => setValues(p => ({...p, [n]: v}))}
            onExplain={(prop) => onExplain(prop, values[prop], "Box Model")}
          />
        </div>
        <CodeViewer cssString={cssString} />
      </div>

      <div className="lg:col-span-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden p-8">
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-10 pointer-events-none">
          {/* Grid background for reference */}
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-400"></div>
          ))}
        </div>

        {/* Margin Visualization Wrapper */}
        <div style={{ 
          border: '2px dashed #fbbf24', 
          display: 'inline-block',
          position: 'relative'
        }}>
           <div className="absolute -top-6 left-0 text-xs text-amber-600 font-mono font-bold">Margin (外边距)</div>
           
           {/* The Element */}
           <div style={styles} className="relative flex items-center justify-center text-center">
             <div className="w-full h-full bg-indigo-200/50 border border-indigo-400/30 flex items-center justify-center relative">
                <span className="text-indigo-900 font-mono text-sm z-10 relative">Content<br/>(内容区)</span>
                
                {/* Padding Overlay Visualization */}
                {values['padding'] > 0 && (
                  <div className="absolute inset-0 border-[length:var(--p)] border-green-400/30 pointer-events-none" style={{ '--p': `${values['padding']}px` } as any}>
                     <div className="absolute top-0 left-0 bg-green-400/20 w-full h-[var(--p)]"></div>
                     <div className="absolute bottom-0 left-0 bg-green-400/20 w-full h-[var(--p)]"></div>
                     <div className="absolute top-0 left-0 bg-green-400/20 h-full w-[var(--p)]"></div>
                     <div className="absolute top-0 right-0 bg-green-400/20 h-full w-[var(--p)]"></div>
                     <span className="absolute top-1 right-1 text-[10px] text-green-700 font-bold">Padding</span>
                  </div>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
