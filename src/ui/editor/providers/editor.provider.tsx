'use client';

import { useState } from "react";
import { EditorContext } from "../contexts/editor.context";
import { NodeTemplateConfig } from "../models/templates.models";

export function EditorProvider({ children, defaultConfig }: { children: React.ReactNode; defaultConfig: NodeTemplateConfig }) {
  const [config, setConfig] = useState<NodeTemplateConfig>(defaultConfig);

  return (
    <EditorContext.Provider value={{ config, setConfig }}>
      {children}
    </EditorContext.Provider>
  );
}