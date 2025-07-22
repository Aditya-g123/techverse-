import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CoursesSection from "@/components/courses-section"
import TestimonialsSection from "@/components/testimonials-section"
import InquirySection from "@/components/inquiry-section"
import ContactSection from "@/components/contact-section"
import FounderSection from "@/components/founder-section"
import GladifyPopup from "@/components/gladify-popup"
import InstantOfferPopup from "@/components/instant-offer-popup"
import WhatsAppButton from "@/components/whatsapp-button"
import BackgroundAnimation from "@/components/background-animation"

export default function HomePage() {
  return (
    <>
      <BackgroundAnimation />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <TestimonialsSection />
      <FounderSection />
      <InquirySection />
      <ContactSection />
      <GladifyPopup />
      <InstantOfferPopup />
      <WhatsAppButton />
    </>
  )
}
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-XH1BXE2Y8C';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
  }, []);
};
       
