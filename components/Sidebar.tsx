import React from 'react';
import { ModuleCategory } from '../types';
import { 
  Square2StackIcon, 
  LanguageIcon, 
  QueueListIcon, 
  MapPinIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeModule: ModuleCategory;
  onSelect: (module: ModuleCategory) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onSelect }) => {
  const navItems = [
    { id: ModuleCategory.BOX_MODEL, label: '盒模型 Box Model', icon: Square2StackIcon },
    { id: ModuleCategory.TYPOGRAPHY, label: '排版 Typography', icon: LanguageIcon },
    { id: ModuleCategory.FLEXBOX, label: 'Flex 布局', icon: QueueListIcon },
    { id: ModuleCategory.POSITIONING, label: '定位 Positioning', icon: MapPinIcon },
    { id: ModuleCategory.EFFECTS, label: '效果 Effects', icon: SparklesIcon },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-indigo-500 rounded-lg p-1 w-8 h-8 flex items-center justify-center text-lg">C</span>
          CSS Master
        </h1>
        <p className="text-xs text-slate-500 mt-2">基础属性可视化学习工具</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
         <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Powered by Gemini 2.5</p>
            <p className="text-[10px] text-slate-500">AI 辅助解释功能已就绪</p>
         </div>
      </div>
    </aside>
  );
};
