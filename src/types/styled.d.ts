import 'styled-components';
import type { light } from "../Themes/light";
import type { fonts } from "../Themes/fonts";

type Theme = typeof light & { 
    fonts: typeof fonts;
    title: string;
 };

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}