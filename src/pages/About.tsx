
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-futuristic-black text-white">
      <Header />
      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About <span className="text-futuristic-yellow">PixelForge AI</span></h1>
          
          <div className="glass-panel p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-6">
              At PixelForge AI, we're revolutionizing the creative landscape by making advanced AI image generation accessible to everyone. Our platform combines cutting-edge artificial intelligence with an intuitive interface, enabling artists, designers, marketers, and enthusiasts to bring their visual ideas to life with unprecedented ease and quality.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="mb-6">
              Founded in 2023 by a team of AI researchers and creative professionals, PixelForge AI represents the convergence of technology and artistic expression. Our diverse team brings together expertise in machine learning, computer vision, UX design, and digital art to create a platform that pushes the boundaries of what's possible in AI-assisted creativity.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="mb-6">
              PixelForge AI leverages the latest advancements in diffusion models, neural networks, and computer vision to generate high-quality images from text descriptions. Our platform integrates multiple state-of-the-art AI models, each optimized for different artistic styles and visual domains, providing users with unparalleled creative flexibility.
            </p>
            
            <p className="mb-6">
              We continuously refine our algorithms through both machine learning techniques and human feedback to improve image quality, prompt understanding, and generation speed. Our commitment to technological excellence ensures that PixelForge AI remains at the forefront of the AI image generation field.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p className="mb-6">
              <strong>Creativity Amplification:</strong> We believe AI should enhance human creativity, not replace it. PixelForge AI is designed to be a collaborative tool that expands artistic possibilities and accelerates the creative process.
            </p>
            
            <p className="mb-6">
              <strong>Accessibility:</strong> We're committed to making advanced AI image generation accessible to everyone, regardless of technical expertise or resources. Our intuitive interface and thoughtful design ensure that users can focus on their creative vision without technical barriers.
            </p>
            
            <p className="mb-6">
              <strong>Ethical Innovation:</strong> We develop our technology responsibly, with built-in safeguards against misuse and commitment to fair representation. We actively work to reduce biases in our models and promote positive applications of AI image generation.
            </p>
            
            <p className="mb-6">
              <strong>Community:</strong> We foster a supportive community of creators who inspire each other, share knowledge, and push the boundaries of what's possible with AI-assisted image creation.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Looking Forward</h2>
            <p className="mb-6">
              As AI technology continues to evolve at a rapid pace, so does PixelForge AI. We're continually implementing new models, features, and improvements to empower our users' creativity. Our roadmap includes expanding into animation, 3D generation, and more interactive creative tools—all while maintaining our focus on quality, usability, and ethical development.
            </p>
            
            <p>
              Join us on this exciting journey as we redefine what's possible in visual creation. Whether you're a professional artist, designer, marketer, educator, or simply someone with ideas to express, PixelForge AI provides the tools to transform your imagination into stunning visual reality.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
