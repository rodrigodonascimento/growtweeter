import { RouterProvider } from "react-router";
import { routes } from "./routes";
import GlobalStyle from './globalStyles';

export function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </>
  );
}