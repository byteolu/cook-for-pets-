import NavBar from '@/components/NavBar';
import RecipeGenerator from '@/components/RecipeGen';
import Image from 'next/image';

export default function Home() {
  return (
   <div>
    <NavBar />
      <div className="space-y-5 pb-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">

          <div
            style={{ backgroundImage: `url(/img/pup-food-love.png)` }}
            className="rounded-lg relative aspect-square md:aspect-[6.3/4] overflow-hidden bg-cover"
          >
          </div>
        </div>
        <div className="pt-2 pb-4 pr-4 pl-4 flex flex-col w-full sm:w-auto justify-center items-center text-center gap-y-4 flex-wrap">
              <div className="font-bold text-2xl sm:text-4xl lg:text-5xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-2 rounded-lg">
                Try Out A Homemade Balanced Meal!
                
              </div>
            </div>
          <div className="service-card w-3/4 mx-auto p-4 shadow-sm rounded-lg text-xl">
            <p className='text-5xl w-full justify-center'> Blog Coming Soon!</p>
        
            </div>
            </div>
        </div>
  );
}

// 
