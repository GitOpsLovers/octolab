import { createContext } from 'react';

import { MyWorkflowsContextType } from '../models/context.models';

export const MyWorkflowsContext = createContext<MyWorkflowsContextType | undefined>(undefined);
