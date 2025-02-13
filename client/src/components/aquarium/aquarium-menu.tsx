type Aquarium = {
    id: string;
    name: string;
    locked?: boolean;
  };
  
  type Props = {
    aquariums: Aquarium[];
    setActiveAquarium: (id: string) => void;
  };
  
  export default function AquariumMenu({ aquariums, setActiveAquarium }: Props) {
    return (
      <div className="w-full h-16 bg-blue-600 flex items-center justify-center space-x-4 text-white overflow-x-auto px-4 py-2 sm:justify-start">
        {aquariums.map((aquarium) => (
          <button
            key={aquarium.id}
            className={`px-4 py-2 rounded whitespace-nowrap sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 ${
              aquarium.locked
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-700"
            }`}
            onClick={() => !aquarium.locked && setActiveAquarium(aquarium.id)}
            disabled={aquarium.locked}
          >
            {aquarium.name} {aquarium.locked && "🔒"}
          </button>
        ))}
      </div>
    );
  }
  