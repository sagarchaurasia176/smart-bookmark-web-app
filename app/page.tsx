import HeroSection from "./Home/page";
import Footer from "./layout/ui/FooterSection/page";
import SecondSection from "./layout/ui/SecondSection/page";
import ThirdSection from "./layout/ui/ThirdSection/page";
import Navbar from "./navbar/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar/>
      {/* other-website components */}
      <HeroSection/>
      {/* two-section */}
      <SecondSection/>
      {/* how it works section */}
      <ThirdSection/>
      {/* Fourth Section */}
      <Footer/>
      
    </div>
  );
}
