
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/components/routing/AppRoutes";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
