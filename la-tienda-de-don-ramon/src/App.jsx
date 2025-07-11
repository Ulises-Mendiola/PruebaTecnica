// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/main.css';
import './styles/darkMode.css';

// Importación diferida para mejor rendimiento
const Login = React.lazy(() => import('./components/Login'));
const ProtectedPage = React.lazy(() => import('./components/ProtectedPage'));

function AppRouter() {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return <LoadingSpinner message="Verificando tu identidad, chavo..." />;
  }

  return (
    <Routes>
      <Route path="/" element={
        user ? <Navigate to="/productos" /> : <Login />
      } />
      
      <Route path="/productos" element={
        user ? <ProtectedPage /> : <Navigate to="/" />
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProductsProvider>
          <Router>
            <div className="app-container">
              <Header />
              <main className="main-content">
                <Suspense fallback={<LoadingSpinner />}>
                  <AppRouter />
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </ProductsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;