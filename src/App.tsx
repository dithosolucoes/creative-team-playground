import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DesignShowcase from "./pages/DesignShowcase";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Produtos from "./pages/admin/Produtos";
import ProdutoCriar from "./pages/admin/ProdutoCriar";
import Experiencias from "./pages/admin/Experiencias";
import ExperienciaDevocional from "./pages/admin/ExperienciaDevocional";
import Vendas from "./pages/admin/Vendas";
import Financeiro from "./pages/admin/Financeiro";
import Configuracoes from "./pages/admin/Configuracoes";
import ProductLanding from "./pages/public/ProductLanding";
import ExperienciaCriar from "@/pages/admin/ExperienciaCriar";
import ProductCheckout from "./pages/public/ProductCheckout";
import PaymentSuccess from "./pages/public/PaymentSuccess";
import AppMain from "./pages/app/AppMain";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = (): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/design-showcase" element={<DesignShowcase />} />
            
            {/* Public Product Routes */}
            <Route path="/produto/:slug" element={<ProductLanding />} />
            <Route path="/produto/:slug/checkout" element={<ProductCheckout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            {/* App Routes */}
            <Route path="/app/*" element={<AppMain />} />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute requireAuth={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="produtos/criar" element={<ProdutoCriar />} />
              <Route path="experiencias" element={<Experiencias />} />
              <Route path="experiencias/criar" element={<ExperienciaCriar />} />
              <Route path="experiencias/devocional" element={<ExperienciaDevocional />} />
              <Route path="vendas" element={<Vendas />} />
              <Route path="financeiro" element={<Financeiro />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
