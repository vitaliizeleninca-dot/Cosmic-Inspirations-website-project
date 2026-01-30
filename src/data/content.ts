export interface SiteContent {
  winnerShowcase: {
    title: string;
    subtitle: string;
    description: string;
    video: string;
    enabled: boolean;
    gallery: Array<{ url: string; title: string; achievement: string }>;
  };
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
    description: "Selected Artist: Curated by 34 Gallery, an organization promoting creative arts advocacy in alignment with UN SDG 3.4. Miami Art Week: Exhibited in One Love Miami (event featured by Forbes). Recognition: Contributor to #FCancer2025 Art for Impact",
    video: "https://www.youtube.com/embed/XHV8HmJsqyQ", 
    enabled: true,
   gallery: [
  { 
    url: "/Klee Cosmic Geometry.png", 
    title: "Featured in Abstract Ambience Magazine Issue #2",
    achievement: "Spotlight Artist Selection - VAVortex"
  },
  { 
    url: "/Cosmic Muse Miami.png", 
    title: "Tribute to the Digital Art Revolution in Miami",
    achievement: "Miami Art Week Spotlight"
  },
  { 
    url: "/In the Spirit of Picasso.png", 
    title: "Recognized for #FCancer Humanitarian Initiative",
    achievement: "Selected Impact Artist"
  },
  { 
    url: "/Celestial Symphony.png", 
    title: "Selected for 'Radiance' Exhibit by 34 Gallery",
    achievement: "Winner Gallery Representation"
  },
  { 
    url: "/Aquarelle Cosmic Metropolis.png", 
    title: "Selected for 'Urban Echoes: Capturing the City's Soul'",
    achievement: "International Selection"
  },
  { 
    url: "/The Synthetic Observer.png", 
    title: "Selected for 'AICanvas' Innovation Showcase",
    achievement: "Digital Excellence Award"
  },
  { 
    url: "/Celestial Builders.png", 
    title: "Selected for 'Gratitude' Digital Open Call",
    achievement: "Selected Artist Showcase"
  },
  { 
    url: "/Cosmic Serenity.png", 
    title: "Selected for 'New Horizons: Art for a Fresh Start'",
    achievement: "Selected Artist - Webbie Social"
  },
  { 
    url: "/Cosmic Doodle First Contact.png", 
    title: "Selected for 'Nostalgia' by 34 Gallery",
    achievement: "Exhibition Winner"
  }
]
     },

  // Hero Section - ТВОИ ТЕКСТЫ СОХРАНЕНЫ
  hero: {
    badge: "Welcome to My Cosmic Realm",
    title: "Immerse Yourself",
    subtitle: "in the Cosmos",
    description: "Where artificial intelligence meets creative vision. Explore cutting-edge digital art, immersive experiences, and Curated Digital Collections crafted at the frontier of technology",
    aboutMeText: `Discover the intersection of art, technology, and cosmic imagination. 
    I create immersive digital experiences using cutting-edge AI tools.
    My work explores the boundaries between human creativity and artificial intelligence.`,
    learnMoreText: `This is a portfolio of AI-generated art and digital experiences.
    Explore the different sections to see my latest works in cosmic ambient music,
    AI art podcasts, and exclusive NFT collections.`,
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
    title: "Art Collections", // Убрали NFT
    subtitle: "Artistic Vision & Technology",
    description: "Curated digital series and immersive audiovisual works exploring cultural memory and future imaginaries.",
    enabled: true,
    collections: [ 
       // оставляем твои работы здесь
    ]
  },
        url: "https://opensea.io/collection/cosmic-inspirations-animated-edition",
        name: "Cosmic Inspirations: Animated Edition",
        image: "/Animated Edition In the Spirit of Gustav Klimt.png" 
      },
      {
        url: "https://objkt.com/collections/KT1KS9HczgmgFuqkSSe3AeZsbu7eyH9MeRXZ",
        name: "Cosmic Inspirations: Digital Echoes",
        image: "/Cosmic Cube Realm.png"
      },
      {
        url: "https://opensea.io/collection/cosmic-inspirations-master-study-sketches",
        name: "Cosmic Inspirations: Retro Edition",
        image: "/Cosmic Inspirations by AlphaRoss in the Style Alexander Golovin.jpeg"
      },
      {
        url: "https://opensea.io/collection/alphaross-season-1-cosmic-inspirations",
        name: "Cosmic Inspirations: AI-Avatars of Great Artists",
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
