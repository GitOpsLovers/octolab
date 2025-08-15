import { createContext } from 'react';

import { TemplateContextType, TemplatesContextType } from '../models/context.models';

export const TemplatesContext = createContext<TemplatesContextType | undefined>(undefined);

export const TemplateContext = createContext<TemplateContextType | undefined>(undefined);
