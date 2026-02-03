export interface SiteContent {
  winnerShowcase: {
    title: string;
    subtitle: string;
    description: string;
    video: string;
    enabled: boolean;
    gallery: Array<{ url: string; title: string; achievement: string }>;
  };
  
aboutMe: { enabled: boolean; title: string; subtitle: string; description: string; cvImage: string; buttonText: string; cvLink: string };
  
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    aboutMeText: string;
    learnMoreText: string;
  };
  aiArtPodcast: { title: string; description: string; enabled: boolean; videos: string[] };
  cosmicAmbient: { title: string; subtitle: string; description: string; enabled: boolean; videos: string[] };
  feelCosmos: { title: string; subtitle: string; description: string; enabled: boolean; videos: string[] };
  nftCollections: { title: string; subtitle: string; description: string; enabled: boolean; collections: any[] };
  nftVideos: { title: string; description: string; enabled: boolean; videos: string[] };
  aiTools: { title: string; subtitle: string; description: string; enabled: boolean; videos: string[] };
  contact: { enabled: boolean };
}

// 2. ЕДИНЫЙ объект контента - теперь всё в одной "коробке"
export const siteContent: SiteContent = {
  // Твои новые достижения
  winnerShowcase: {
    title: "International Open Call Selection",
    subtitle: "Exhibited at Art Basel Miami & Global Digital Galleries",
    description: `Selected by 34 Gallery. The organization contributes to UN SDG 3.4 through creative arts. Shown at One Love Miami Art Week, an event described by Forbes as a “must-see.” Featured in #FCancer2025, linked to nonprofit LetsFCancer, which supports cancer prevention`,
    video: "https://www.youtube.com/embed/XHV8HmJsqyQ", 
    enabled: true,
  gallery: [
  {
    url: "/Astral Couture.png",
    achievement: "Selected Artist — Digital Fashion",
    title: "Selected through the 'Digital Fashion Forward' Open Call",
    date: "January 2026" //
  },
{ 
    url: "/Quantum Entanglement.png", 
    achievement: "Selected Artist — Generate Love: Generative Art & AI",
    title: "Selected through 'Generate Love: Generative Art & AI' Open Call",
    date: "February 2026"
  },
  { 
    url: "/Cosmic Life.png",
    achievement: "Selected Artist — Love Letters to Myself: A Typography Art Challenge",
    title: "Selected through 'Love Letters to Myself: A Typography Art Challenge' Open Call by 34 Gallery",
    date: "February 2026"
  },    
  {
    url: "/Rebirth from Stardust.png",
    achievement: "Selected Artist — Spirit Animal",
    title: "Selected through the 'Spirit Animal' Open Call",
    date: "January 2026" //
  },
  { 
    url: "/Klee Cosmic Geometry.png", 
    achievement: "Featured Artist — Abstract Ambience",
    title: "Selected for the Abstract Ambience Magazine Issue #2",
    date: "December 2025" //
  },
  { 
    url: "/Cosmic Muse Miami.png", 
    achievement: "Exhibiting Artist — One Love Art",
    title: "Featured in 'One Love Art' Exhibition, Miami Art Week",
    date: "December 2025" //
  },
  { 
    url: "/In the Spirit of Picasso.png", 
    achievement: "Selected Artist — #FCancer",
    title: "Selected through the '#FCancer' Humanitarian Open Call",
    date: "October 2025" //
  },
  { 
    url: "/Celestial Symphony.png", 
    achievement: "Selected Artist — Radiance",
    title: "Selected through the 'Radiance' Open Call by 34 Gallery",
    date: "January 2026" //
  },
  { 
    url: "/Aquarelle Cosmic Metropolis.png", 
    achievement: "Selected Artist — Urban Echoes",
    title: "Selected through the 'Urban Echoes: Capturing the City’s Soul' Open Call",
    date: "January 2026" //
  },
  { 
    url: "/The Synthetic Observer.png", 
    achievement: "Selected Artist — AICanvas",
    title: "Selected through the 'AICanvas' Innovation Showcase Open Call",
    date: "January 2026" //
  },
  { 
    url: "/Celestial Builders.png", 
    achievement: "Selected Artist — Gratitude",
    title: "Selected through the 'Gratitude' Digital Open Call",
    date: "November 2025" //
  },
  { 
    url: "/Cosmic Serenity.png", 
    achievement: "Selected Artist — New Horizons",
    title: "Selected through the 'New Horizons: Art for a Fresh Start' Open Call",
    date: "January 2026" //
  },
  { 
    url: "/Cosmic Doodle First Contact.png", 
    achievement: "Selected Artist — Nostalgia",
    title: "Selected through the 'Nostalgia' Open Call by 34 Gallery",
    date: "December 2025" //
  }
]
},

  aboutMe: {
    enabled: true,
    title: "About Me",
    subtitle: "Digital Artist | AI & Media Creator",
    description: "Vitalii Zelenin (Alpha Ross) is a creative technologist whose work has been exhibited during Miami Art Week and recognized by Forbes. Selected by 34 Gallery for projects aligned with UN SDG 3.4.",
    cvImage: "/CV_Alpha_Ross.png",
    buttonText: "View Full CV",
    cvLink: "/CV_Alpha_Ross.png" 
  },
  
hero: {
    badge: "Welcome to My Cosmic Realm",
    title: "Immerse Yourself",
    subtitle: "in the Cosmos",
    description: "Where artificial intelligence meets creative vision. Explore cutting-edge digital art, immersive experiences, and curated digital collections crafted at the frontier of technology",
    
    // Текст для SEO
    aboutMeText: "Digital Artist | AI & Media Creator. Work exhibited during Miami Art Week and recognized by Forbes.",

    // Текст для модального окна Learn More (с обратными кавычками)
    learnMoreText: `Alpha Ross — AI & Media Artist | Creative Technology Practice

I am an AI and media artist working at the intersection of artificial intelligence, sound, visual media, and cultural heritage. My practice explores how creative technologies can be used to reflect on the past, present, and possible futures through audiovisual forms.

My work includes AI-generated podcast formats with artistic reconstructions of historical figures, generative media art projects, and ambient cinematic soundscapes. I approach cultural storytelling with a critical and ethical perspective on the use of artificial intelligence.

My projects focus on future imagination, collective memory, and cultural responsibility, using sound, image, and narrative as tools for reflection and dialogue.

Based in Finland, I work within Nordic and international cultural contexts and engage with themes aligned with the UN Sustainable Development Goal 3.4, with particular attention to mental well-being and human-centered innovation.`,
  },
  
  
  // AI Art Podcast - ТВОИ ВИДЕО СОХРАНЕНЫ
  aiArtPodcast: {
    title: "AI Art Podcast",
    description: "Explore conversations at the intersection of artificial intelligence and creative expression, where legendary masters come to life with AI avatars, sharing their voices, ideas, and timeless wisdom",
    enabled: true,
    videos: [
      "https://www.youtube.com/embed/iMXTQt2tWko",
      "https://www.youtube.com/embed/sMui14XvhjY",
    ],
  },

  // Cosmic Ambient - ТВОИ ВИДЕО СОХРАНЕНЫ
  cosmicAmbient: {
    title: "Cosmic Ambient",
    subtitle: "40-Min Tracks",
    description: "Journey through AI-curated ambient soundscapes that evoke the vastness of space. Each composition is designed to elevate your consciousness and inspire creative flow. From Deep Focus & Productivity to Sleep & Meditation",
    enabled: true,
    videos: [
      "https://www.youtube.com/embed/TG3v7yBEH5E",
      "https://www.youtube.com/embed/EVfd34fKZYo",
      "https://www.youtube.com/embed/2GcTZP27IeM",
      "https://www.youtube.com/embed/djwdPu3X3H0",
      "https://www.youtube.com/embed/-NV3FIc7024",
    ],
  },

  // Feel the Cosmos - ТВОИ ВИДЕО СОХРАНЕНЫ
  feelCosmos: {
    title: "Feel the Cosmos",
    subtitle: "40-Min Tracks",
    description: "Step into an interactive universe where art, sound, and technology converge. Explore immersive AI-generated soundscapes inspired by the world's cultural centers. Young women in luxurious costumes appear against futuristic cosmic landscapes",
    enabled: true,
    videos: [
      "https://www.youtube.com/embed/XHV8HmJsqyQ",     
      "https://www.youtube.com/embed/u2SNVF_Scm0",
       "https://www.youtube.com/embed/-0d3NsRwl9g",
    ],
  },
 
 nftCollections: {
    title: "Art Collections",
    subtitle: "Artistic Vision & Technology",
    description: "Curated digital series and immersive audiovisual works exploring cultural memory and future imaginaries",
    enabled: true,
    collections: [ 
      {
        url: "https://opensea.io/collection/cosmic-inspirations-animated-edition",
        name: `Cosmic Inspirations:\nAnimated Edition`,
        image: "/Animated Edition In the Spirit of Gustav Klimt.png" 
      },
      {
        url: "https://objkt.com/collections/KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ",
        name: `Cosmic Inspirations:\nDigital Echoes`,
        image: "/Cosmic Cube Realm.png"
      },
      {
        url: "https://opensea.io/collection/cosmic-inspirations-master-study-sketches",
        name: `Cosmic Inspirations:\nRetro Edition`,
        image: "/Cosmic Inspirations by AlphaRoss in the Style Alexander Golovin.jpeg"
      },
      {
        url: "https://opensea.io/collection/alphaross-season-1-cosmic-inspirations",
        name: `Cosmic Inspirations:\nAI-Avatars of Great Artists`,
        image: "/Cosmic Inspirations by AlphaRoss in da Vinci Style.jpeg"
      }
    ],
  },

  nftVideos: {
    title: "Collection Showcases",
    description: "Watch these cinematic trailers showcasing the essence of my digital collections",
    enabled: true,
    videos: [
      "https://www.youtube.com/embed/O7K1vqs3ZnA",
      "https://www.youtube.com/embed/nn_Q2rsYtPs",
    ],
  },

  aiTools: {
    title: "My AI Tools",
    subtitle: "Powerful solutions for creators",
    description: "Meet the tools I use daily to create content. They help creators, artists, and media professionals work faster and more creatively, from video editing to voice synthesis",
    enabled: true,
    videos: [
     "https://www.youtube.com/embed/jrDZrU4NjXQ",
      "https://www.youtube.com/embed/d3Z15MAun6Q",      
    ],
  },

  contact: {
    enabled: true,
  },
};
