
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect } from "react";
import {IColors} from './color'

export type ICustomTheme = "system" | "light" | "dark";

export type ICustomThemeProvider = React.FC<{
  children: ReactNode;
}>;

export type ICustomThemeContext = {
  colors: IColors;
  currentTheme: "light" | "dark";
  setCustomTheme: Dispatch<SetStateAction<ICustomTheme>>;
};

export const CustomThemeContext =
  React.createContext<ICustomThemeContext | null>(null);


  export function useCustomTheme(): ICustomThemeContext {
    const context = useContext(CustomThemeContext);
  
    useEffect(() => {
      if (!context) {
        console.error(
          "useCustomTheme must be used inside <CustomThemeProvider>"
        );
      }
    }, [context]);
  
    return context as ICustomThemeContext;
  }