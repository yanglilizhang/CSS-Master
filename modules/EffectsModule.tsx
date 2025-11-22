import React, { useState, useMemo } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { CodeViewer } from '../components/CodeViewer';
import { CSSPropertyControl } from '../types';

interface Props {
  onExplain: (prop: string, val: string, context: string) => void;
}

export const EffectsModule: React.FC<Props> = ({ onExplain }) => {
  const [values, setValues] = useState<{[key: string]: any}>({
    'border-radius': 12,
    'box-shadow': 'medium',
    'opacity': 1,
    'transform': 0,
    'background-color': '#8b5cf6'
  });

  const shadowMap: any = {
    'none': 'none',
    'small': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'medium': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'large': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    'colored': '0 10px 25px -5px rgba(139, 92, 246, 0.5)'
  };

  const controls: CSSPropertyControl[] = [
    { name: 'background-color', label: '背景色', type: 'color', value: '#8b5cf6' },
    { name: 'border-radius', label: '圆角', type: 'range', min: 0, max: 100, step: 1, value: 12, unit: 'px' },
    { name: 'box-shadow', label: '阴影', type: 'select', options: ['none', 'small', 'medium', 'large', 'colored'], value: 'medium' },
    { name: 'opacity', label: '不透明度', type: 'range', min: 0, max: 1, step: 0.1, value: 1, unit: '' },
    { name: 'transform', label: '旋转 (deg)', type: 'range', min: 0, max: 360, step: 15, value: 0, unit: 'deg' },
  ];

  const styles = {
    width: '200px',
    height: '200px',
    backgroundColor: values['background-color'],
    borderRadius: `${values['border-radius']}px`,
    boxShadow: shadowMap[values['box-shadow']],
    opacity: values['opacity'],
    transform: `rotate(${values['transform']}deg)`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const cssString = useMemo(() => {
    return Object.entries(styles).map(([key, val]) => {
       const kebab = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
       return `\n  ${kebab}: ${val};`;
    }).join('');
  }, [styles]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">视觉效果</h3>
          <ControlPanel 
            controls={controls} 
            values={values} 
            onChange={(n, v) => setValues(p => ({...p, [n]: v}))}
            onExplain={(prop) => onExplain(prop, values[prop], "CSS Visual Effects")}
          />
        </div>
        <CodeViewer cssString={cssString} />
      </div>

      <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
         <div style={styles}>
           Box
         </div>
      </div>
    </div>
  );
};
