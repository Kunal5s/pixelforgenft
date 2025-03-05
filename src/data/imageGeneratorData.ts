
// Aspect ratios available for selection
export const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Widescreen (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "3:4", label: "Portrait Standard (3:4)" },
  { value: "3:2", label: "Classic (3:2)" },
  { value: "2:3", label: "Portrait Classic (2:3)" },
  { value: "4:5", label: "Instagram Portrait (4:5)" },
];

// Model definitions with supported aspect ratios
export const modelsList = [
  {
    value: "sdxl-turbo",
    label: "SDXL Turbo Pro",
    description: "Ultra-fast, high-quality image generation with strong prompt adherence",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "4:5"],
  },
  {
    value: "sdxl-1.5",
    label: "Stable Diffusion XL 1.5+",
    description: "Ultra-realistic, high-detail professional image creation",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "4:5"],
  },
  {
    value: "sd-lightning",
    label: "SD Lightning V2",
    description: "Lightning-fast generation with exceptional detail retention",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    value: "flux",
    label: "FLUX.1-schnell MAX",
    description: "Premium commercial-grade AI images by Black Forest Labs",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    value: "realvis",
    label: "RealVisXL V4.0 UHD",
    description: "Photorealistic image generation with stunning details",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:2"],
  },
  {
    value: "dreamshaper",
    label: "DreamShaper XL Pro",
    description: "Creative and artistic high-detail illustrations and concepts",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "4:5"],
  },
  {
    value: "deepfloyd",
    label: "DeepFloyd IF Ultra",
    description: "Google Imagen alternative for photorealistic results",
    supportedRatios: ["1:1", "16:9", "9:16", "4:3", "3:2"],
  },
  {
    value: "openjourney",
    label: "OpenJourney V4 Pro",
    description: "MidJourney-style artistic masterpieces",
    supportedRatios: ["1:1", "16:9", "4:3", "3:2", "9:16"],
  },
  {
    value: "controlnet",
    label: "ControlNet + SDXL",
    description: "Advanced precision-based image synthesis",
    supportedRatios: ["1:1", "16:9", "4:3", "3:2", "9:16"],
  },
  {
    value: "playground",
    label: "Playground V2.5 Ultra",
    description: "Expert-level realistic image generation with lifelike details",
    supportedRatios: ["1:1", "16:9", "4:3", "3:2", "9:16"],
  },
  {
    value: "julibrain",
    label: "JuliBrain Photoreal",
    description: "Advanced AI model for photographic realism and artistic quality",
    supportedRatios: ["1:1", "16:9", "4:3", "3:2", "9:16"],
  },
  {
    value: "pixart",
    label: "PixArt-Σ Ultra",
    description: "Multi-concept composer with stunning visual quality",
    supportedRatios: ["1:1", "16:9", "4:3", "3:2", "9:16"],
  },
];

// Style presets with emojis
export const stylePresets = [
  // Basic Art Styles
  { value: "digital-art", label: "Modern Digital Art 🖌️" },
  { value: "painterly", label: "Painterly 🎨" },
  { value: "abstract", label: "Abstract Art 💧" },
  { value: "watercolor", label: "Watercolor 📊" },
  { value: "line-art", label: "Minimalist Line Art 🔷" },
  { value: "low-poly", label: "3D Low Poly 💥" },
  { value: "comic", label: "Comic Book 📏" },
  { value: "vector", label: "Vector Art 🖼️" },
  
  // Ultra-Photorealistic & Advanced Styles
  { value: "hyper-3d", label: "Hyper-Realistic 3D 🖼️" },
  { value: "photorealistic", label: "Ultra-Photorealistic 🎬" },
  { value: "cinematic", label: "Cinematic 8K 🎨" },
  { value: "concept-art", label: "Professional Concept Art ✨" },
  { value: "advanced-anime", label: "Advanced Anime 🏙️" },
  { value: "anime-cyberpunk", label: "Anime Cyberpunk 📚" },
  { value: "manga", label: "Professional Manga 🚀" },
  { value: "sci-fi", label: "Sci-Fi Concept 🐉" },
  { value: "fantasy", label: "Fantasy Epic 🤖" },
  { value: "cyberpunk", label: "Cyberpunk 🧙‍♂️" },
  { value: "dark-fantasy", label: "Dark Fantasy 🌀" },
  { value: "surrealism", label: "AI Surrealism 🖼️" },
  { value: "renaissance", label: "Renaissance Oil 👾" },
  { value: "pixel-art", label: "Pixel Art ✒️" },
  { value: "ink-sketch", label: "Detailed Ink Sketch 🏗️" },
  { value: "isometric", label: "3D Isometric 💫" },
  { value: "neon", label: "Neon Glow 🌈" },
  { value: "holographic", label: "Holographic 📺" },
  { value: "retro-futurism", label: "Retro Futurism 🌟" },
];
