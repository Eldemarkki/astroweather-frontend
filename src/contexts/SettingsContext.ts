import React from "react";

export interface SettingsContextType {
  backgroundHue: number
  setBackgroundHue: (newValue: number) => void;
}

export const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);
