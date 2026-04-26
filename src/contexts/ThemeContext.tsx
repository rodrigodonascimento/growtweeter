import { createContext, useContext, useState } from "react";
import { light } from "../Themes/light";
import { dark } from "../Themes/dark";
import { fonts } from "../Themes/fonts";
import { ThemeProvider } from "styled-components";

interface ThemeContextInterface {
    themeTitle: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeTitle, setThemeTitle] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem("@Growtweeter:theme");
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
    });

    const toggleTheme = () => {
        setThemeTitle(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const currentTheme = {
        title: themeTitle,
        fonts,
        ...(themeTitle === 'light' ? light : dark)
    };

    return (
        <ThemeContext.Provider value={{ themeTitle, toggleTheme }}>
            <ThemeProvider theme={currentTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
