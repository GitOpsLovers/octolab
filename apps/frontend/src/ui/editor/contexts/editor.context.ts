import { createContext } from 'react';

import { EditorCustomContextType, EditorTemplateContextType } from '../models/context.models';

export const EditorTemplateContext = createContext<EditorTemplateContextType | undefined>(undefined);
export const EditorCustomContext = createContext<EditorCustomContextType | undefined>(undefined);
