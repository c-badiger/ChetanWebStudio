import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TrustSection } from './components/trust/TrustSection';
import { ServicesSection } from './components/services/ServicesSection';
import { ProblemSolutionSection } from './components/comparison/ProblemSolutionSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { TechStackSection } from './components/techstack/TechStackSection';
import { ProcessSection } from './components/process/ProcessSection';
import { PricingSection } from './components/pricing/PricingSection';
import { TestimonialsSection } from './components/reviews/TestimonialsSection';
import { PaymentSection } from './components/payment/PaymentSection';
import { ContactSection } from './components/contact/ContactSection';
import { ProjectBriefWizard } from './components/contact/ProjectBriefWizard';
import { FAQSection } from './components/faq/FAQSection';
import { FinalCTA } from './components/common/FinalCTA';
import { Footer } from './components/layout/Footer';
import { LegalModals } from './components/legal/LegalModals';
import { StickyMobileCTA } from './components/common/StickyMobileCTA';
import { NotFound } from './components/common/NotFound';

// Admin Dashboard Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { AdminInquiries } from './components/admin/AdminInquiries';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminSettings } from './components/admin/AdminSettings';

const PublicPortfolioApp: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');
  const [selectedPlanTitle, setSelectedPlanTitle] = useState('');
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [is404, setIs404] = useState(false);

  if (is404) {
    return <NotFound onGoHome={() => setIs404(false)} />;
  }

  const handleSelectService = (title: string) => {
    setSelectedServiceTitle(title);
  };

  const handleSelectPlan = (title: string) => {
    setSelectedPlanTitle(title);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-300 relative">
      
      {/* Sticky Header Navigation */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      {/* Main Sections Stack */}
      <main>
        <HeroSection onOpenWizard={() => setIsWizardOpen(true)} />
        <TrustSection />
        <ServicesSection onSelectService={handleSelectService} />
        <ProblemSolutionSection />
        <PortfolioSection onOpenWizard={() => setIsWizardOpen(true)} />
        <TechStackSection />
        <ProcessSection onOpenWizard={() => setIsWizardOpen(true)} />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <TestimonialsSection />
        <PaymentSection />
        <ContactSection
          selectedServiceTitle={selectedServiceTitle}
          selectedPlanTitle={selectedPlanTitle}
        />
        <FAQSection />
        <FinalCTA onOpenWizard={() => setIsWizardOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModal(type)}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      {/* Interactive 5-Step Project Brief Qualification Wizard */}
      <ProjectBriefWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialService={selectedServiceTitle || selectedPlanTitle}
      />

      {/* Legal Modals */}
      <LegalModals
        modalType={legalModal}
        onClose={() => setLegalModal(null)}
      />

      {/* Sticky Mobile Conversion CTA */}
      <StickyMobileCTA onOpenWizard={() => setIsWizardOpen(true)} />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicPortfolioApp />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard Shell & Child Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback Catch-All */}
        <Route path="*" element={<PublicPortfolioApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
