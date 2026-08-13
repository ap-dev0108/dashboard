import { Header } from "./Nav";
import { TechnicalArsenal } from "./sections/Arsenal";
import { LetsConnect } from "./sections/Connect";
import { Footer } from "./sections/Footer";
import { HeroSection } from "./sections/Hero";
import { MyJourney } from "./sections/Journey";
import { SelectedWorks } from "./sections/ProjectSection";
import { ServicesOffering } from "./sections/Services";

export const Portfolio = () => {
  return (
    <section>
      <Header />
      <HeroSection />
      <SelectedWorks />
      <ServicesOffering />
      <TechnicalArsenal />
      <MyJourney />
      <LetsConnect />
      <Footer />
    </section>
  );
};
