import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.context";
import { AppRouter } from "./routers/app.router";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
  )
};

export default App;
