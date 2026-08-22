import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import AboutTeaser from "@/components/home/AboutTeaser";
import Capabilities from "@/components/home/Capabilities";
import ExperienceTeaser from "@/components/home/ExperienceTeaser";
import ContactCta from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <AboutTeaser />
      <Capabilities />
      <ExperienceTeaser />
      <ContactCta />
    </>
  );
}
