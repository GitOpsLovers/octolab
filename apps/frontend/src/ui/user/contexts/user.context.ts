import { createContext } from 'react';

import { CurrentUserContextType } from '../models/context.models';

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);
