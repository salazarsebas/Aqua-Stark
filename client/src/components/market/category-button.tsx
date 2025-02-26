import React from "react";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <div className="relative flex flex-col items-center w-[125px] md:w-[150px] cursor-pointer" onClick={onClick}>
      <div className="absolute -top-2 w-full h-[85px] bg-[#02387A] rounded-t-[2rem] shadow-xl z-0"></div>

      <div
        className={`relative w-full h-[80px] flex items-center justify-center rounded-t-[2rem] text-white text-sm sm:text-base md:text-lg font-semibold
                    transition-all duration-200 ease-in-out z-10 pb-4
                    ${
                      isActive
                        ? "bg-[#0873F6] shadow-lg"
                        : "bg-gradient-to-b from-blue-800 to-blue-900 shadow-md"
                    }
                    hover:brightness-110 active:scale-95 active:brightness-90`}
      >
        <span>{label}</span>
      </div>
    </div>
  );
};

export default CategoryButton;
