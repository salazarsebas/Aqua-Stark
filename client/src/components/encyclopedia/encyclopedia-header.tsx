import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fish } from "lucide-react";

interface HeaderProps {
  discoveredSpecies: number;
  totalSpecies: number;
}

const Header: React.FC<HeaderProps> = ({ discoveredSpecies, totalSpecies }) => {
  return (
    <header className="relative z-10 bg-blue-800/50 backdrop-blur-sm border-b border-blue-700/50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/game" className="mr-4">
            <Button variant="ghost" className="text-white hover:bg-blue-700/50 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Game
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Fish Encyclopedia</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-700/50 rounded-lg px-3 py-1 text-white flex items-center">
            <Fish className="h-4 w-4 mr-1 text-blue-300" />
            <span className="font-bold">{discoveredSpecies}</span>
            <span className="text-blue-300 mx-1">/</span>
            <span>{totalSpecies}</span>
            <span className="text-blue-300 ml-1">Species</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
