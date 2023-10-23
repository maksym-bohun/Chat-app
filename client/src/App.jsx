import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat, { contactsLoader } from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

function App() {
  const router = createBrowserRouter([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/setAvatar", element: <SetAvatar /> },
    { path: "/", element: <Chat />, loader: contactsLoader },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
