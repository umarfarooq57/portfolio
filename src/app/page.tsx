import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <TechStack />
        <WhyUs />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
