import Navbar from '@/components/layout/Navbar';
import HomeHero from './components/home/HomeHero';
import TrustBar from './components/home/TrustBar';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import Categories from '@/components/sections/Categories';
import Testimonials from '@/components/sections/Testimonials';
import InstructorSpotlight from './components/home/InstructorSpotlight';
import HomeCTA from './components/home/HomeCTA';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-[72px] md:pt-16">
        <HomeHero />
        <TrustBar />
        <FeaturedCourses />
        <Categories />
        <Testimonials />
        <InstructorSpotlight />
        <HomeCTA />
      </main>
    </div>
  );
}