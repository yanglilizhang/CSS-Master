import React, { useState, useMemo } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { CodeViewer } from '../components/CodeViewer';
import { CSSPropertyControl } from '../types';

interface Props {
  onExplain: (prop: string, val: string, context: string) => void;
}

export const FlexboxModule: React.FC<Props> = ({ onExplain }) => {
  const [values, setValues] = useState<{[key: string]: any}>({
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'flex-wrap': 'nowrap',
    'gap': 10,
  });

  const controls: CSSPropertyControl[] = [
    { name: 'flex-direction', label: '主轴方向', type: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'], value: 'row', description: '决定项目的排列方向' },
    { name: 'justify-content', label: '主轴对齐', type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'], value: 'flex-start', description: '定义项目在主轴上的对齐方式' },
    { name: 'align-items', label: '交叉轴对齐', type: 'select', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], value: 'stretch', description: '定义项目在交叉轴上的对齐方式' },
    { name: 'flex-wrap', label: '换行', type: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'], value: 'nowrap' },
    { name: 'gap', label: '间距', type: 'range', min: 0, max: 50, step: 5, value: 10, unit: 'px' },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: values['flex-direction'] as any,
    justifyContent: values['justify-content'],
    alignItems: values['align-items'],
    flexWrap: values['flex-wrap'] as any,
    gap: `${values['gap']}px`,
    height: '100%',
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    border: '2px dashed #cbd5e1',
    transition: 'all 0.3s ease'
  };

  const cssString = useMemo(() => {
    return Object.entries(containerStyle).map(([key, val]) => {
       const kebab = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
       return `\n  ${kebab}: ${val};`;
    }).join('');
  }, [containerStyle]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Flex Container 属性</h3>
          <ControlPanel 
            controls={controls} 
            values={values} 
            onChange={(n, v) => setValues(p => ({...p, [n]: v}))}
            onExplain={(prop) => onExplain(prop, values[prop], "Flexbox Layout")}
          />
        </div>
        <CodeViewer cssString={cssString} />
      </div>

      <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col">
        <div className="flex-1 min-h-[400px]">
           <div style={containerStyle}>
             {[1, 2, 3, 4, 5].map((item) => (
               <div key={item} 
                className="bg-indigo-500 text-white font-bold rounded shadow-md flex items-center justify-center transition-all"
                style={{ 
                  width: values['flex-direction'].includes('row') ? '80px' : '100%',
                  height: values['flex-direction'].includes('column') ? '60px' : '80px',
                  minWidth: '60px',
                  minHeight: '60px',
                }}
               >
                 {item}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};
