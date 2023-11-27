import Image from 'next/image'
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroComp';
import Features from './components/Features';
import { getAllPosts } from "../lib/api";
import PostPreview from "./components/PostPreview";
import PostHero from "./components/PostHero";
import Link from "next/link";
import Footer from './components/Footer';


export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const recentPosts = posts.slice(0, 2);


  return (
    <div>
      <main>
      <NavigationBar />
      <HeroSection />

        <p className="text-3xl mb-6">Recent Posts</p>
        <div className="grid md:grid-cols-2 grid-cols-1 mx-auto md:gap-32 gap-8">
      {recentPosts.map((post, index) => (
        <div key={post.id || post.slug || index}> {/* Replace with a unique identifier */}
          <PostPreview post={post} />
        </div>
      ))}
    </div>

        
        <Link
          href="/blog"
          className="text-3xl hover:text-gray-300 hover:underline"
        >
          Read More{" -> "}
        </Link>
        </main>

        <Footer />
        </div>
    
  );
}

// orginal nav bar i made with react
// <NavBar />
// new one will be made with chakara ui 

// Notes - delete herosection function from the
// other component folder in HeroSection.tsx 