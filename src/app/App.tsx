import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sell from './pages/Sell';
import Product from './pages/Product';
import Generate from './pages/Generate';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';

export default function App() {
  useEffect(() => {
    document.title = 'Twin-Market - 3D 중고거래 플랫폼';
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sell" element={<Sell />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="generate" element={<Generate />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </LanguageProvider>
  );
}
