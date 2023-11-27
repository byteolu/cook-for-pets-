import NavBar from '@/components/NavBar';
import RecipeGenerator from '@/components/RecipeGen';
import Image from 'next/image';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer'
import BirthdayHeroSection from '../components/HeroBirthdaySection';
import BirthdayCakeRecipeGenerator from '@/components/BirthdayCakeRecipeGen';


export default function Birthdaytreatspage() {
  return (
   <div>
    <NavigationBar />

    <BirthdayHeroSection />

    <BirthdayCakeRecipeGenerator />

    <Footer />
    
</div>
  );
}

// 
