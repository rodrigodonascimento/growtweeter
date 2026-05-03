import { RouterProvider } from "react-router";
import { routes } from "./routes";
import GlobalStyle from './globalStyles';
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import { LoadingOverlay } from "./components/LoadingOverlay";

export function App() {
  const { isLoading } = useAuth();

  return (
    <ThemeContextProvider>
      <GlobalStyle />
      {isLoading && <LoadingOverlay />}
      <RouterProvider router={routes} />
    </ThemeContextProvider>
  );
}