import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Analytics from "@/pages/Analytics";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;