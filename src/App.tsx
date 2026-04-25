import { RouterProvider } from "react-router";
import { routes } from "./routes";
import GlobalStyle from './globalStyles';
import { ThemeContextProvider } from "./contexts/ThemeContext";

export function App() {
  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeContextProvider>
  );
}