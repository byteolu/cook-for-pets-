import NavBar from '@/components/NavBar';
import RecipeGenerator from '@/components/RecipeGen';
import Image from 'next/image';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection-blog';
import { getAllPosts } from "@/lib/api";
import PostPreview from "../components/PostPreview";
import PostHero from "../components/PostHero";
import Link from "next/link";
import Footer from '../components/Footer';





export default function BlogPage() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
   <div>
    <NavigationBar />
    <HeroSection />
    <div className="container mx-auto px-5">
    <main>
        <h1 className="text-center text-3xl">All Posts</h1>

        <div className="h-12"></div>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-32 gap-8">
          {posts.map((post) => (
            <div key={post.slug}> {/* Replace post.id with the unique identifier of your post */}
              <PostPreview post={post} />
            </div>
          ))}
        </div>
      </main>
    </div>
    <Footer />
   </div>
  );
}

//
 
//<div key={post.id}>
// <PostPreview post={post} />
// </div> 
//

