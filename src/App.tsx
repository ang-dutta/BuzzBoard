import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EvolutionTimeline } from './components/EvolutionTimeline';
import { FeaturesSection } from './components/FeaturesSection';
import { PlanningForm } from './components/PlanningForm';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

interface FormData {
  businessType: string;
  productCategory: string;
  budget: string;
  duration: string;
  audience: string;
  goal: string;
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handlePlanningComplete = (data: FormData) => {
    setFormData(data);
    setShowDashboard(true);
  };

  const handleBackToPlanning = () => {
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="evolution">
          <EvolutionTimeline />
        </section>
        
        <section id="features">
          <FeaturesSection />
        </section>
        
        {!showDashboard ? (
          <PlanningForm onComplete={handlePlanningComplete} />
        ) : (
          formData && (
            <section id="dashboard">
              <Dashboard formData={formData} onBack={handleBackToPlanning} />
            </section>
          )
        )}
      </main>
      
      <Footer />
    </div>
  );
}