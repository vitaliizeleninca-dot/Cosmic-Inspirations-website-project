```javascript
import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import HeroModal from "./components/HeroModal";
import { siteContent } from "./data/content";

const artworks = [
  { id: 1, src: "/Future Couture 2.png", title: "Future Couture" },
  { id: 2, src: "/northern_pulse_2.png", title: "Northern Pulse" },
];

export default function Index() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const {
    hero,
    winnerShowcase,
    cosmicAmbient,
    feelCosmos,
    aiTools,
    nftCollections,
    contact,
    aiArtPodcast
  } = siteContent;

  const radius = 450;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

<div className="min-h-screen overflow-x-hidden bg-[#030014] text-gray-100 selection:bg-cosmic-purple/30">

<style>{`

@keyframes rotate-3d {
from { transform: rotateY(0deg); }
to { transform: rotateY(-360deg); }
}

.cosmic-perspective {
perspective: 2000px;
perspective-origin: center -10%;
}

.cosmic-spinner {
position: relative;
width: 100%;
height: 100%;
transform-style: preserve-3d;
animation: rotate-3d 40s linear infinite;
}

.cosmic-spinner:hover {
animation-play-state: paused;
}

.carousel-card {
position: absolute;
left: 50%;
top: 50%;
backface-visibility: hidden;
transition: transform .6s ease;
}

.hero-fade {
transition: opacity 0.6s ease, transform 0.6s ease;
}

`}</style>

<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-cosmic-purple/20">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

<a href="#" className="flex items-center gap-3 hover:opacity-80 transition">
<Sparkles className="w-8 h-8 text-cosmic-purple animate-pulse"/>
<h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-violet bg-clip-text text-transparent">
Cosmic Hub
</h1>
</a>

<nav className="hidden sm:flex items-center gap-8">

<a href="#podcast" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
AI Art Podcast
</a>

<a href="#music" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
Cosmic Ambient
</a>

<a href="#experience" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
Feel the Cosmos
</a>

<a href="#nft" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
Art Collections
</a>

<a href="#my-ai-tools" className="text-sm text-gray-300 hover:text-cosmic-purple transition">
My AI Tools
</a>

</nav>

{contact.enabled && (
<button
onClick={() => setIsContactModalOpen(true)}
className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-cosmic-dark bg-gradient-to-r from-cosmic-purple to-cosmic-violet hover:cosmic-glow"
>
Contact Me
</button>
)}

</div>
</header>

<main className="pt-20">

<section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

<div
className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
style={{
opacity: Math.max(0.03, 0.08 - scrollY / 3000),
transform: `translateY(${scrollY * 0.2}px)`
}}
>

<h2 className="text-[12vw] font-bold leading-none text-center">

<span className="bg-gradient-to-r from-cosmic-purple via-cosmic-violet to-cosmic-purple bg-clip-text text-transparent">
{hero.title}
</span>

<br/>

<span className="text-gray-200">
{hero.subtitle}
</span>

</h2>

</div>

<div className="cosmic-perspective w-full h-[420px] mb-16 flex items-center justify-center z-20 relative">

<div
className="cosmic-spinner"
style={{
transform: `rotateX(${scrollY * 0.02}deg)`
}}
>

{artworks.map((art, index) => {

const angle = artworks.length > 1
? (index / artworks.length) * 360
: 0;

return (

<div
key={art.id}
className="carousel-card w-[280px] sm:w-[460px]"
style={{
transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`
}}
>

<div className="relative rounded-2xl overflow-hidden border border-cosmic-purple/30 bg-black/40 shadow-2xl shadow-cosmic-purple/20 backdrop-blur-md">

<img
src={art.src}
alt={art.title}
className="w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end text-left">

<p className="text-white text-lg font-bold">
{art.title}
</p>

<p className="text-cosmic-purple text-[10px] uppercase font-bold tracking-widest">
Selected Masterpiece
</p>

</div>

</div>

</div>

);

})}

</div>

<div className="absolute w-64 h-64 bg-cosmic-purple/20 blur-[120px] rounded-full -z-10"/>

</div>

<div
className="hero-fade flex flex-col sm:flex-row gap-4 justify-center"
style={{
opacity: 1 - scrollY / 600,
transform: `translateY(${scrollY * 0.2}px)`
}}
>

<a
href="/CV_Alpha_Ross.png"
target="_blank"
rel="noopener noreferrer"
className="px-8 py-3 rounded-lg font-semibold border-2 border-cosmic-purple/50 text-cosmic-purple hover:border-cosmic-purple hover:cosmic-glow transition-all duration-300 uppercase tracking-wider"
>
View My CV
</a>

<button
onClick={() => setIsLearnMoreOpen(true)}
className="px-8 py-3 rounded-lg font-semibold border-2 border-white/10 text-gray-300 hover:border-white/30 transition-all duration-300 uppercase tracking-wider"
>
Learn More
</button>

</div>

</section>

<Footer/>

</main>

<ContactModal
isOpen={isContactModalOpen}
onClose={() => setIsContactModalOpen(false)}
/>

<HeroModal
isOpen={isLearnMoreOpen}
title="Learn More"
content={hero.learnMoreText}
onClose={() => setIsLearnMoreOpen(false)}
/>

</div>

);
}
```
