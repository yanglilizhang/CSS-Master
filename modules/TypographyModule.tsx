import React, { useState, useMemo } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { CodeViewer } from '../components/CodeViewer';
import { CSSPropertyControl } from '../types';

interface Props {
  onExplain: (prop: string, val: string, context: string) => void;
}

export const TypographyModule: React.FC<Props> = ({ onExplain }) => {
  const [values, setValues] = useState<{[key: string]: any}>({
    'font-size': 24,
    'font-weight': '400',
    'line-height': 1.5,
    'letter-spacing': 0,
    'text-align': 'left',
    'color': '#1e293b',
    'text-decoration': 'none'
  });

  const controls: CSSPropertyControl[] = [
    { name: 'font-size', label: '字号', type: 'range', min: 12, max: 72, step: 1, value: 24, unit: 'px' },
    { name: 'font-weight', label: '字重', type: 'select', options: ['100', '300', '400', '500', '700', '900'], value: '400' },
    { name: 'line-height', label: '行高', type: 'range', min: 1, max: 3, step: 0.1, value: 1.5, unit: '' },
    { name: 'letter-spacing', label: '字间距', type: 'range', min: -2, max: 10, step: 0.5, value: 0, unit: 'px' },
    { name: 'text-align', label: '对齐方式', type: 'select', options: ['left', 'center', 'right', 'justify'], value: 'left' },
    { name: 'text-decoration', label: '装饰线', type: 'select', options: ['none', 'underline', 'line-through', 'overline'], value: 'none' },
    { name: 'color', label: '颜色', type: 'color', value: '#1e293b' },
  ];

  const styles = {
    fontSize: `${values['font-size']}px`,
    fontWeight: values['font-weight'],
    lineHeight: values['line-height'],
    letterSpacing: `${values['letter-spacing']}px`,
    textAlign: values['text-align'] as any,
    color: values['color'],
    textDecoration: values['text-decoration'],
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease'
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
          <h3 className="text-lg font-bold text-slate-800 mb-4">排版属性</h3>
          <ControlPanel 
            controls={controls} 
            values={values} 
            onChange={(n, v) => setValues(p => ({...p, [n]: v}))}
            onExplain={(prop) => onExplain(prop, values[prop], "Typography")}
          />
        </div>
        <CodeViewer cssString={cssString} />
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-12 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-2xl">
           <h1 className="text-3xl font-bold text-slate-200 mb-4 pb-2 border-b border-slate-100">Preview</h1>
           <p style={styles}>
             CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. 
             <br/><br/>
             层叠样式表 (CSS) 是一种用来为结构化文档（如 HTML 文档或 XML 应用）添加样式（字体、间距和颜色等）的计算机语言。
           </p>
        </div>
      </div>
    </div>
  );
};
