import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/common/HeroSection";
import QuoteBanner from "../../components/common/QuoteBanner";
import WomenIllustration from "../../components/common/WomenIllustration";
import WhyChoose from "../../components/common/WhyChoose";
import Testimonials from "../../components/common/Testimonials";
import Statistics from "../../components/common/Statistics";
import AboutSection from "../../components/common/AboutSection";
import FAQ from "../../components/common/FAQ";
import Footer from "../../components/footer/Footer";

function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">

      <Navbar />

      <HeroSection />

      <QuoteBanner />

      <WomenIllustration />

      <WhyChoose />

      <Testimonials />

      <Statistics />

      <AboutSection />

      <FAQ />

      <Footer />

    </div>
  );
}

export default Welcome;