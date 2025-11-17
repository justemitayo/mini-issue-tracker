// src/theme/CustomThemeProvider.tsx
import React, { useEffect, useState } from "react";
import {
  CustomThemeContext,
  ICustomThemeProvider,
  ICustomTheme,
} from "./interface";
import { light, dark } from "./color";

export const CustomThemeProvider: ICustomThemeProvider = ({ children }) => {
  const [customTheme, setCustomTheme] = useState<ICustomTheme>("system");

  const [systemScheme, setSystemScheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

 
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setSystemScheme(e.matches ? "dark" : "light");
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  const themeColors =
  customTheme === "system"
    ? systemScheme === "dark"
      ? dark
      : light
    : customTheme === "light"
    ? light
    : dark;



  useEffect(() => {
    const root = document.documentElement;
  
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [themeColors]);


  return (
    <CustomThemeContext.Provider
      value={{
        colors: themeColors,
        currentTheme: customTheme === "system" ? systemScheme : customTheme,
        setCustomTheme,
      }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
};
