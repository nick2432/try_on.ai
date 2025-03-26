import { useState, useEffect, useRef,useCallback } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Mail, Phone, ArrowDown} from "lucide-react";
import AnimatedText from './components/AnimatedText';
export default function App() {
  const [section, setSection] = useState(0);
  const isScrolling = useRef(false); // Persist isScrolling between renders

  const nextSection = useCallback(() => {
    setSection((prev) => (prev < 3 ? prev + 1 : prev));
  }, []);
  
  const prevSection = useCallback(() => {
    setSection((prev) => Math.max(prev - 1, 0));
  }, []);

  const backToTop = () => setSection(0);
 
  const sections = [
    <Hero key="hero" setSection={setSection} section={section} nextSection={nextSection} />,
    <HowItWorks key="how" setSection={setSection} section={section} nextSection={nextSection} />,
    <WhyThisHelps key="why" setSection={setSection} section={section} nextSection={nextSection} />,
    <Contact key="contact" />
  ];

  useEffect(() => {
    let startY = 0; // Track touch start position
  
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
  
    const handleTouchEnd = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
  
      const endY = e.changedTouches[0].clientY;
      const threshold = 50; // Minimum swipe distance to trigger a scroll
  
      if (startY - endY > threshold) {
        nextSection(); // Swipe up = scroll down
      } else if (endY - startY > threshold) {
        prevSection(); // Swipe down = scroll up
      }
  
      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // Prevent rapid transitions
    };
  
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
  
      const threshold = 50;
      if (e.deltaY > threshold) {
        nextSection();
      } else if (e.deltaY < -threshold) {
        prevSection();
      }
  
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };
  
    // Attach both event listeners
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      // Clean up both event listeners
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSection, prevSection]); // Keeping section as a dependency if needed
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      <Header setSection={setSection} section={section} />
      <div className="relative h-screen">
        <div
          className="absolute w-full h-full transition-transform duration-700"
          style={{ transform: `translateY(-${section * 100}%)` }}
        >
          {sections.map((sec, index) => (
            <div className="w-full h-screen relative" key={index}>
              {sec}
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="fixed bottom-10 w-full flex justify-center z-50">
          {section < 3 ? (
            <Button
              isIconOnly
              color="primary"
              size="lg"
             className="shadow-md hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              onClick={nextSection}
            >
              <ArrowDown className="w-8 h-8" />
            </Button>
          ) : (
            <Button
              isIconOnly
              color="primary"
              size="lg"
             className="shadow-md hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              onClick={backToTop}
            >
              <ArrowDown className="w-8 h-8 rotate-180" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ setSection, section }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full flex flex-wrap justify-between items-center p-4 bg-white shadow-md z-50">
    <h1 className="text-2xl font-bold text-gray-900">
      Try-on<span className="text-blue-500">.ai</span>
    </h1>

    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-4">
    <Button 
  auto 
  flat 
  className={`font-medium ${section === 0 ? "text-blue-600" : "text-gray-700"}`} 
  onClick={() => setSection(0)}
>
  What We Are
</Button>
    <Button auto flat className={`font-medium ${section === 1 ? "text-blue-600" : "text-gray-700"}`} onClick={() => setSection(1)}>How It Works</Button>
<Button auto flat className={`font-medium ${section === 2 ? "text-blue-600" : "text-gray-700"}`} onClick={() => setSection(2)}>Benefits</Button>
<Button auto flat className={`font-medium ${section === 3 ? "text-blue-600" : "text-gray-700"}`} onClick={() => setSection(3)}>Contact Us</Button>

    </nav>

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button
        className="text-3xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </div>

    {/* Mobile Menu Items */}
    {menuOpen && (
      <div className="w-full mt-4 flex flex-col space-y-2 md:hidden">
        <Button auto flat color={section === 0 ? "secondary" : "primary"} onClick={() => { setSection(0); setMenuOpen(false); }}>What We Are</Button>
        <Button auto flat color={section === 1 ? "secondary" : "primary"} onClick={() => { setSection(1); setMenuOpen(false); }}>How It Works</Button>
        <Button auto flat color={section === 2 ? "secondary" : "primary"} onClick={() => { setSection(2); setMenuOpen(false); }}>Benefits</Button>
        <Button auto flat color={section === 3 ? "secondary" : "primary"} onClick={() => { setSection(3); setMenuOpen(false); }}>Contact Us</Button>
      </div>
    )}
  </header>
  
  );
}





function Hero() {
  return (
    <section 
      id="what-we-are"
      className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-20 py-10 pt-16 gap-10 scroll-mt-16"
    >
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What We Are</h2>
        <AnimatedText />
        <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
          We are building an AI-powered social platform where users can discover, try, and experience products virtually. Our AI recommends the best products based on user needs, enabling virtual try-ons, content creation, and direct purchase from brand links.

          Our experienced team — with backgrounds in 
          <a href="https://www.linkedin.com/in/aman-kumar-30a083172/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Amazon</a>, 
          <a href="https://www.linkedin.com/in/akhil-anand-0a8283186/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Observe.AI</a>, 
          Microsoft, 
          <a href="https://www.linkedin.com/in/rampagee/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> PayPal</a>, and 
          <a href="https://www.linkedin.com/in/nikhil-anand-a9402b1b8/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> FealtyX</a> — is passionate about combining AI and social experiences to help brands connect with real users in an interactive way.

          We’re not just a try-on tool — we’re creating a virtual space where brands gain visibility, users express their style, and everyone connects through creativity.
        </p>
      </div>

      {/* IMAGE HIDDEN ON MOBILE */}
      <div className="hidden md:flex md:w-1/2 w-full justify-center">
        <img 
          src="/20943566.jpg" 
          alt="Product" 
          className="max-h-[250px] md:max-h-[600px] w-full md:w-auto rounded-xl shadow-xl object-contain"
        />
      </div>
    </section>
  );
}


function HowItWorks() {
  return (
    <section className="w-full bg-gray-100 min-h-[100vh] py-16 px-4 md:px-8 mt-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">How It Works</h2>
        <ul className="text-lg md:text-xl text-gray-700 space-y-6 leading-relaxed">

<li>✅ <strong>Brands Onboard</strong> — Brands upload their product details, images, videos, 3D models, and provide the direct purchase link.</li>

<li>✅ <strong>AI Product Recommendations</strong> — Users chat with our AI, describe their needs, and instantly get personalized product suggestions.</li>

<li>✅ <strong>Virtual Try-On</strong> — Users try the products virtually, wearing outfits or accessories on themselves in real-time.</li>

<li>✅ <strong>Create & Share Reels or Photos</strong> — Users can generate virtual looks, post photos or reels on our platform, and engage with the community.</li>

<li>✅ <strong>Buy Directly from Brand’s Link</strong> — If they love the look, users click the <em>“Buy Now”</em> button and purchase directly from the brand’s website or store.</li>

</ul>

      </div>
  
      {/* Image hidden on mobile */}
      <div className="hidden md:flex justify-center">
        <img 
          src="/4884158.jpg" 
          alt="How It Works" 
          className="rounded-2xl shadow-2xl w-auto max-w-[500px] hover:scale-105 transition-transform duration-300 object-contain"
        />
      </div>
    </div>
  </section>
  
  
  );
}

function WhyThisHelps() {
  return (
    <section className="w-full bg-gray-100 min-h-[100vh] py-16 px-4 md:px-8 mt-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Benefits</h2>
          <ul className="text-lg md:text-xl text-gray-700 space-y-6 leading-relaxed">

<li>✅ <strong>More Visibility</strong> — Showcase your products to users actively seeking style ideas.</li>

<li>✅ <strong>AI Virtual Try-On</strong> — Let users experience your products virtually and interactively.</li>

<li>✅ <strong>Direct Purchase Links</strong> — Drive traffic straight to your store with no middleman.</li>

<li>✅ <strong>User-Generated Content</strong> — Users create reels/photos featuring your products for organic reach.</li>

<li>✅ <strong>Actionable Insights</strong> — Track user engagement and product performance easily.</li>

<li>✅ <strong>Cost-Effective Marketing</strong> — Market, engage, and sell — all in one platform.</li>

</ul>


        </div>

        {/* Hide Image on Mobile */}
        <div className="hidden md:flex justify-center">
          <img 
            src="/Business team climbing giant handshake with support of leader.jpg" 
            alt="Why It Helps" 
            className="rounded-2xl shadow-2xl w-auto max-w-[500px] hover:scale-105 transition-transform duration-300 object-contain"
          />
        </div>
      </div>
    </section>
  );
}


function Contact() {
  const [copied, setCopied] = useState("");

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000); // Reset after 2 seconds
  };

  return (
    <section className="w-full bg-gray-100 min-h-[80vh] py-16 px-4 md:px-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Contact Us</h2>
      <p className="text-lg md:text-2xl text-gray-700 mb-8 md:mb-12">For more details</p>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full">
        {/* Email 1 */}
        <Card 
          shadow="lg" 
          className="hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleCopy("nikhilanand2432@gmail.com")}
        >
          <CardBody className="flex flex-col items-center p-6 md:p-8">
            <Mail className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
            <p className="text-lg md:text-xl font-semibold">Email 1</p>
            <p className="mt-4 text-blue-700 text-sm md:text-base">
              {copied === "nikhilanand2432@gmail.com" ? "Copied!" : "nikhilanand2432@gmail.com"}
            </p>
          </CardBody>
        </Card>
  
        {/* Email 2 */}
        <Card 
          shadow="lg" 
          className="hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleCopy("btme0011@gmail.com")}
        >
          <CardBody className="flex flex-col items-center p-6 md:p-8">
            <Mail className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
            <p className="text-lg md:text-xl font-semibold">Email 2</p>
            <p className="mt-4 text-blue-700 text-sm md:text-base">
              {copied === "btme0011@gmail.com" ? "Copied!" : "btme0011@gmail.com"}
            </p>
          </CardBody>
        </Card>
  
        {/* Phone */}
        <Card 
          shadow="lg" 
          className="hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleCopy("8296868158")}
        >
          <CardBody className="flex flex-col items-center p-6 md:p-8">
            <Phone className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
            <p className="text-lg md:text-xl font-semibold">Phone</p>
            <p className="mt-4 text-blue-700 text-sm md:text-base">
              {copied === "8296868158" ? "Copied!" : "8296868158"}
            </p>
          </CardBody>
        </Card>
      </div>
  
      {/* Toast Message */}
      {copied && (
        <div className="fixed bottom-10 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-base md:text-lg">
          Copied: {copied}
        </div>
      )}
    </section>
  );
  
}