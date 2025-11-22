import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { BoxModelModule } from './modules/BoxModelModule';
import { FlexboxModule } from './modules/FlexboxModule';
import { TypographyModule } from './modules/TypographyModule';
import { PositioningModule } from './modules/PositioningModule';
import { EffectsModule } from './modules/EffectsModule';
import { AiAssistant } from './components/AiAssistant';
import { ModuleCategory } from './types';
import { explainCSSConcept } from './services/geminiService';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleCategory>(ModuleCategory.BOX_MODEL);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleExplain = useCallback(async (property: string, value: string, context: string) => {
    setAiExplanation(null);
    setIsAiLoading(true);
    try {
      const explanation = await explainCSSConcept(property, value, context);
      setAiExplanation(explanation);
    } catch (e) {
      setAiExplanation("抱歉，AI 服务出现错误。");
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleCategory.BOX_MODEL:
        return <BoxModelModule onExplain={handleExplain} />;
      case ModuleCategory.FLEXBOX:
        return <FlexboxModule onExplain={handleExplain} />;
      case ModuleCategory.TYPOGRAPHY:
        return <TypographyModule onExplain={handleExplain} />;
      case ModuleCategory.POSITIONING:
        return <PositioningModule onExplain={handleExplain} />;
      case ModuleCategory.EFFECTS:
        return <EffectsModule onExplain={handleExplain} />;
      default:
        return <BoxModelModule onExplain={handleExplain} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeModule={activeModule} onSelect={setActiveModule} />
      
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">
            {activeModule === ModuleCategory.BOX_MODEL && '盒模型 (Box Model)'}
            {activeModule === ModuleCategory.FLEXBOX && 'Flex 布局'}
            {activeModule === ModuleCategory.TYPOGRAPHY && '排版 (Typography)'}
            {activeModule === ModuleCategory.POSITIONING && '定位 (Positioning)'}
            {activeModule === ModuleCategory.EFFECTS && '视觉效果 (Effects)'}
          </h2>
          <div className="text-sm text-slate-500 hidden md:block">
            调节左侧参数，右侧实时预览
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-8">
          {renderModule()}
        </div>

        <AiAssistant 
          explanation={aiExplanation} 
          isLoading={isAiLoading} 
          onClose={() => setAiExplanation(null)} 
        />
      </main>
    </div>
  );
};

export default App;
