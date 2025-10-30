import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router";
import AuthProvider from "./application/context/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter}></RouterProvider>;
    </AuthProvider>
  );
}

export default App;
