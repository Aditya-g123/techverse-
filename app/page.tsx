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
