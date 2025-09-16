import WelcomeNavbar from "@/app/welcome/components/welcome-navbar";
import Hero from "@/app/welcome/components/hero";

function WelcomePage() {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <WelcomeNavbar />
      <Hero />
    </div>
  );
}

export default WelcomePage;
