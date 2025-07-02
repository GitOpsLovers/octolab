import { createContext } from "react";
import { EditorContextType } from "../models/context.models";

export const EditorContext = createContext<EditorContextType | undefined>(undefined);