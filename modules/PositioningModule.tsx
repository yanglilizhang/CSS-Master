import React, { useState, useMemo } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { CodeViewer } from '../components/CodeViewer';
import { CSSPropertyControl } from '../types';

interface Props {
  onExplain: (prop: string, val: string, context: string) => void;
}

export const PositioningModule: React.FC<Props> = ({ onExplain }) => {
  const [values, setValues] = useState<{[key: string]: any}>({
    'position': 'absolute',
    'top': 40,
    'left': 40,
    'z-index': 10,
  });
  
  const [isHovering, setIsHovering] = useState(false);

  const controls: CSSPropertyControl[] = [
    { name: 'position', label: '定位模式', type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'], value: 'absolute', description: 'static: 默认; relative: 相对自身; absolute: 相对最近定位祖先; fixed: 相对视口; sticky: 滚动时吸附' },
    { name: 'top', label: 'Top (顶部距离)', type: 'range', min: 0, max: 250, step: 10, value: 40, unit: 'px' },
    { name: 'left', label: 'Left (左侧距离)', type: 'range', min: 0, max: 250, step: 10, value: 40, unit: 'px' },
    { name: 'z-index', label: '层级', type: 'range', min: 0, max: 20, step: 1, value: 10, unit: '', description: '控制元素在垂直于屏幕方向的堆叠顺序，数值越大越靠上 (仅对非 static 元素有效)' },
  ];

  const styles = {
    position: values['position'] as any,
    top: values['position'] === 'static' ? 'auto' : `${values['top']}px`,
    left: values['position'] === 'static' ? 'auto' : `${values['left']}px`,
    zIndex: values['z-index'],
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(236, 72, 153, 0.9)', // pink-500 with opacity
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    boxShadow: isHovering 
      ? '0 20px 25px -5px rgba(236, 72, 153, 0.4), 0 8px 10px -6px rgba(236, 72, 153, 0.2)' 
      : '0 10px 15px -3px rgba(236, 72, 153, 0.3), 0 4px 6px -2px rgba(236, 72, 153, 0.1)',
    transform: isHovering && values['position'] !== 'static' ? 'scale(1.05)' : 'scale(1)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    cursor: 'default',
    backdropFilter: 'blur(4px)',
  };

  const cssString = useMemo(() => {
     const exportStyles: any = { ...styles };
     if (values['position'] === 'static') {
       delete exportStyles.top;
       delete exportStyles.left;
       delete exportStyles.zIndex;
     }
     delete exportStyles.cursor;
     delete exportStyles.backdropFilter;
     if (exportStyles.transform && exportStyles.transform.includes('scale')) delete exportStyles.transform;
     if (exportStyles.boxShadow) exportStyles.boxShadow = '0 10px 15px -3px rgba(236, 72, 153, 0.3)';
     
    return Object.entries(exportStyles).map(([key, val]) => {
       const kebab = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
       return `\n  ${kebab}: ${val};`;
    }).join('');
  }, [styles, values]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
       <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-pink-100 rounded-lg">
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">定位属性</h3>
          </div>
          
           <div className="bg-slate-50 border border-slate-200 p-4 mb-6 rounded-lg text-sm leading-relaxed text-slate-600">
             <p className="font-medium text-slate-800 mb-2">关键概念：</p>
             <ul className="space-y-2">
               <li className="flex items-start gap-2">
                 <span className="bg-slate-200 text-slate-600 px-1.5 rounded text-xs font-mono mt-0.5">static</span>
                 <span>遵循正常的文档流，top/left 无效。</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="bg-blue-100 text-blue-700 px-1.5 rounded text-xs font-mono mt-0.5">relative</span>
                 <span>相对自身原位置偏移，不脱离文档流。</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="bg-pink-100 text-pink-700 px-1.5 rounded text-xs font-mono mt-0.5">absolute</span>
                 <span>相对于最近的<span className="border-b border-dashed border-slate-400">非 static</span> 祖先定位。</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="bg-purple-100 text-purple-700 px-1.5 rounded text-xs font-mono mt-0.5">fixed</span>
                 <span>相对于浏览器窗口（视口）定位。</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="bg-orange-100 text-orange-700 px-1.5 rounded text-xs font-mono mt-0.5">sticky</span>
                 <span>在滚动范围内，达到阈值时变为固定定位。</span>
               </li>
             </ul>
           </div>

          <ControlPanel 
            controls={controls} 
            values={values} 
            onChange={(n, v) => setValues(p => ({...p, [n]: v}))}
            onExplain={(prop) => onExplain(prop, values[prop], "CSS Positioning")}
          />
        </div>
        <CodeViewer cssString={cssString} />
      </div>

      {/* Visual Stage */}
      <div className="lg:col-span-2 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden h-[600px] flex items-center justify-center shadow-inner select-none">
        
         {/* Viewport Grid Background */}
         <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-20">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-400"></div>
            ))}
         </div>
         
         {/* Viewport Label */}
         <div className="absolute top-4 left-4 flex items-center gap-2 text-slate-400 pointer-events-none">
            <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
            <span className="text-xs font-mono font-bold tracking-wider">VIEWPORT (浏览器视口)</span>
         </div>

         {/* Parent Container Wrapper - Defines the boundary */}
         <div className="relative w-[400px] h-[400px]">
            
            {/* Parent Label - Anchored to the wrapper, doesn't scroll inside */}
            <div className="absolute -top-3 left-6 bg-indigo-50 pl-2 pr-3 py-1 text-xs font-mono text-indigo-600 font-bold border border-indigo-200 rounded-full shadow-sm z-30 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              Parent (position: relative)
            </div>

            {/* The Actual Visual Box with Scroll */}
            <div className="w-full h-full bg-white border-2 border-dashed border-indigo-300 rounded-2xl shadow-xl overflow-hidden relative flex flex-col">
               
               {/* Scroll Container */}
               <div className="w-full h-full overflow-y-auto relative scroll-smooth" id="scroll-container">
                  <div className="p-8 pb-32">
                    
                    {/* Sibling content to demonstrate static flow & spacing */}
                    <div className={`space-y-4 mb-4 transition-opacity duration-300 ${isHovering ? 'opacity-30 blur-[1px]' : 'opacity-40'} pointer-events-none`}>
                       <div className="flex gap-4">
                         <div className="h-14 w-14 bg-slate-200 rounded-xl"></div>
                         <div className="flex-1 space-y-2.5 py-1">
                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                         </div>
                       </div>
                       <div className="relative h-20 bg-slate-100 rounded-xl border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 text-xs font-mono text-center p-4">
                         Static Sibling Element<br/>(Occupies space)
                         <div className={`absolute -right-4 top-1/2 translate-x-full -translate-y-1/2 ml-2 transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <div className="flex items-center gap-1">
                               <div className="w-4 h-[1px] bg-slate-400"></div>
                               <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-slate-200 font-mono whitespace-nowrap">
                                  z-index: auto
                               </span>
                            </div>
                         </div>
                       </div>
                       <div className="space-y-2">
                         <div className="h-2 bg-slate-200 rounded w-full"></div>
                         <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                       </div>
                    </div>

                    {/* The Target Element */}
                    <div 
                      style={styles} 
                      className="z-20 group"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                       <div className="flex flex-col items-center justify-center h-full w-full text-center p-2">
                         <span className="text-sm font-bold leading-tight">Target</span>
                         <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded mt-1.5 backdrop-blur-md">
                            {values['position']}
                         </span>
                       </div>
                       
                       {isHovering && (
                         <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50">
                            <div className="relative bg-slate-800 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap">
                               z-index: {values['z-index']}
                               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                            </div>
                         </div>
                       )}

                       {values['position'] !== 'static' && (
                         <>
                           {/* Top Guide */}
                           <div className="absolute -top-[1000px] left-1/2 w-px h-[1000px] border-l-2 border-pink-400/40 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[10px] text-pink-600 font-mono font-bold bg-pink-50 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-sm border border-pink-100">
                             top: {values['top']}px
                           </div>
                           
                           {/* Left Guide */}
                           <div className="absolute -left-[1000px] top-1/2 h-px w-[1000px] border-t-2 border-pink-400/40 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                           <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 text-[10px] text-pink-600 font-mono font-bold bg-pink-50 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-sm border border-pink-100">
                             left: {values['left']}px
                           </div>
                         </>
                       )}
                    </div>
                    
                    {/* Extra scrollable space */}
                    <div className="h-[500px] w-full mt-8 border-t border-dashed border-slate-200 relative opacity-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] rounded-lg flex justify-center">
                       <div className="mt-4 text-xs text-slate-400 font-mono bg-white/80 px-2 py-1 h-fit rounded border border-slate-200">
                          Scrollable Content Area
                       </div>
                    </div>

                  </div>
               </div>

               {/* Scroll Hint Overlay */}
               {values['position'] === 'sticky' && (
                   <div className="absolute bottom-6 right-6 pointer-events-none animate-bounce flex items-center gap-1 text-indigo-500 bg-white/90 px-3 py-1.5 rounded-full text-xs font-bold shadow-md border border-indigo-100 z-30">
                       <span>↓</span> Scroll to test sticky
                   </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};