import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}