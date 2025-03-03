
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ModelsSection from '@/components/ModelsSection';
import GallerySection from '@/components/GallerySection';
import ImageCreator from '@/components/ImageCreator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-futuristic-black text-white overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ModelsSection />
        <GallerySection />
        <ImageCreator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
