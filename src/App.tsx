
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KontakProvider } from "@/context/KontakContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <KontakProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* These routes would be implemented in future iterations */}
            <Route path="/nasabah" element={<Index />} />
            <Route path="/nasabah/:id" element={<Index />} />
            <Route path="/nasabah/tambah" element={<Index />} />
            <Route path="/agen" element={<Index />} />
            <Route path="/agen/:id" element={<Index />} />
            <Route path="/agen/tambah" element={<Index />} />
            <Route path="/aktivitas" element={<Index />} />
            <Route path="/jadwal" element={<Index />} />
            <Route path="/laporan" element={<Index />} />
            <Route path="/pengaturan" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </KontakProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
