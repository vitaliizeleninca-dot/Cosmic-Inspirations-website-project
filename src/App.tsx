import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import PhotoGallery from './components/PhotoGallery'
import VideoShowcase from './components/VideoShowcase'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <AboutMe />
      <PhotoGallery />
      <VideoShowcase />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
