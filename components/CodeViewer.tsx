import React from 'react';

interface CodeViewerProps {
  cssString: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ cssString }) => {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg mt-4">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-medium text-slate-400">Generated CSS</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-indigo-300 whitespace-pre">
          <code>
            <span className="text-pink-400">.element</span> {'{'}
            {cssString}
            {'}'}
          </code>
        </pre>
      </div>
    </div>
  );
};
