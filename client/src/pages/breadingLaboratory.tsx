import {
  FaCalculator,
  FaDna,
  FaFlask,
  FaSitemap,
  FaRegLightbulb,
} from "react-icons/fa";
import GeneticCombinationsPage from "@/components/Genetics";

const BreadingLaboratory = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 text-white py-5">
      <div className="py-2  px-6 flex justify-between  mx-5 bg-blue-600 font-bold rounded">
        <button className="flex flex-row items-center justify-center text-white/90 hover:text-white w-1/2 hover:bg-blue-500 py-1">
          <FaDna className="h-5 w-5 mb-1" />
          <span className="text-xs ml-2">Breeding</span>
        </button>
        <button className="flex flex-row items-center text-white/90 hover:text-white w-1/2 justify-center hover:bg-blue-500 py-1">
          <FaFlask className="h-5 w-5 mb-1" />
          <span className="text-xs ml-2">Genetics</span>
        </button>
        <button className="flex flex-row items-center text-white/90 hover:text-white w-1/2 justify-center hover:bg-blue-500 py-1">
          <FaRegLightbulb className="h-5 w-5 mb-1" />
          <span className="text-xs ml-2">Discoveries</span>
        </button>
        <button className="flex flex-row items-center text-white/90 hover:text-white w-1/2 justify-center hover:bg-blue-500 py-1">
          <FaSitemap className="h-5 w-5 mb-1" />
          <span className="text-xs ml-2">Genealogy</span>
        </button>
      </div>
      <GeneticCombinationsPage/>
    </div>
  );
};

export default BreadingLaboratory;
