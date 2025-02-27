import Button from '@/components/ui/button';
import ButtonLarge from '@/components/ui/button-large';
import CategoryButton from '@/components/market/category-button';
import React, { useEffect, useState } from 'react';

type CategoryType = "FISH" | "FOOD" | "DECORATIONS" | "OTHERS";
type SubcategoryType = "SPECIALS" | "LEGENDARY" | "RARE" | "CARNIVORY" | string;

interface FishStoreProps {
  onClose?: () => void;
}
interface FishMenuProps {
  onClose?: () => void;
}
export default function Market({ onClose }: FishMenuProps) {
   // State management
   const [activeCategory, setActiveCategory] = useState<CategoryType>("FISH");
   const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryType>("SPECIALS");
   const [currentPage, setCurrentPage] = useState<number>(0);
   const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
     width: typeof window !== 'undefined' ? window.innerWidth : 0,
     height: typeof window !== 'undefined' ? window.innerHeight : 0,
   });
 
   // Category definitions
   const categories: CategoryType[] = ["FISH", "FOOD", "DECORATIONS", "OTHERS"];
   const subcategories: Record<CategoryType, SubcategoryType[]> = {
     "FISH": ["SPECIALS", "LEGENDARY", "RARE", "CARNIVORY"],
     "FOOD": ["FLAKES", "PELLETS", "FROZEN", "LIVE"],
     "DECORATIONS": ["PLANTS", "ROCKS", "ORNAMENTS", "LIGHTING"],
     "OTHERS": ["EQUIPMENT", "ACCESSORY", "TANKS", "CHEMICALS"],
   };
 
   // Handle window resize
   useEffect(() => {
     const handleResize = () => {
       setWindowSize({
         width: window.innerWidth,
         height: window.innerHeight,
       });
     };
 
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);
 
   // Event handlers
   const handleCategoryClick = (category: CategoryType): void => {
     setActiveCategory(category);
     setActiveSubcategory(subcategories[category][0]);
     setCurrentPage(0);
   };
 
   const handleSubcategoryClick = (subcategory: SubcategoryType): void => {
     setActiveSubcategory(subcategory);
     setCurrentPage(0);
   };
 
   const handlePreviousPage = (): void => {
     setCurrentPage((prev) => Math.max(0, prev - 1));
   };
 
   const handleNextPage = (): void => {
     // Assuming a max page count of 5 for demonstration
     setCurrentPage((prev) => Math.min(4, prev + 1));
   };
 
   return (
     <div className="fixed inset-0 max-w-7xl mx-auto flex items-center justify-center z-50">
       <div className="w-full  px-4 md:px-[18rem] flex flex-col items-center">
         {/* Top navigation tabs */}
         <div className="flex justify-start w-full relative -bottom-6 md:-bottom-[7rem] pt-6 md:pt-8">
           {categories.map((category) => (
             <CategoryButton
               key={category}
               label={category}
               isActive={activeCategory === category}
               onClick={() => handleCategoryClick(category)}
             />
           ))}
         </div>
         <div 
           className="relative z-10 w-full h-[70vh] max-h-[900px] flex flex-col bg-no-repeat bg-cover bg-center"
           style={{ backgroundImage: `url('/textures/panels/panel-store.svg')`, backgroundSize: "contain" }}
         >
           {/* Content area */}
           <div className="flex-1 flex flex-col overflow-hidden">
             {/* Subcategory navigation */}
             <div className="flex flex-wrap justify-start pl-4 md:pl-8 gap-2 mt-[5rem] md:mt-[6rem]">
               {subcategories[activeCategory].map((subcategory) => (
                 <ButtonLarge
                   key={subcategory}
                   color="blue"
                   className="text-xs sm:text-sm md:text-base lg:text-lg"
                   onClick={() => handleSubcategoryClick(subcategory)}
                 >
                   {subcategory}
                 </ButtonLarge>
               ))}
             </div>
 
             {/* Main content area */}
             <div className="flex items-center justify-center">
               <div className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl">
                 {activeCategory} - {activeSubcategory} (Page {currentPage + 1})
                 <p className="mt-4 text-xs sm:text-sm md:text-base lg:text-lg">
                   Content would appear here for the selected category and subcategory.
                 </p>
               </div>
             </div>
 
             {/* Navigation controls */}
             <div className="flex justify-between absolute bottom-[6rem] w-full items-center mt-4 md:mt-8 px-4 md:px-8">
               <Button
                 color="yellow"
                 className="w-6 h-6 md:w-12 md:h-12 flex items-center justify-center p-1"
                 onClick={handlePreviousPage}
                 iconSrc='/textures/icons/Arrow02Left.svg'
               />
               <Button
                 color="yellow"
                 className="w-6 h-6 md:w-12 md:h-12 flex items-center justify-center p-1"
                 onClick={handleNextPage}
                 iconSrc='/textures/icons/Arrow02Right.svg'
               />
             </div>
           </div>
 
           {/* Close button */}
           <Button
             color="red"
             className="absolute -top-[33rem] -right-[40rem]  w-6 h-6 md:w-12 md:h-12 flex items-center justify-center p-1"
             onClick={onClose}
             iconSrc='/textures/icons/X.svg'
           />
         </div>
       </div>
     </div>
   );
};