import { createContext } from 'react';

import { TemplatesContextType } from '../models/context.models';

export const TemplatesContext = createContext<TemplatesContextType | undefined>(undefined);
