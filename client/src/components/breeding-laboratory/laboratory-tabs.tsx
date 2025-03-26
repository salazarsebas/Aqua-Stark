import { Heart, Tangent, FileText, SatelliteDish } from "lucide-react";
import { useState } from "react";

type Tab = 'breeding' | 'genetics' | 'discoveries' | 'genealogy';

export function LaboratoryTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('discoveries');

  return (
    <nav className="bg-blue-900/40 backdrop-blur-sm px-3 py-2 rounded-xl mt-8">
      <div className="text-gray-300 text-md flex justify-between w-[90%] mx-auto">
        <button 
          className={`flex items-center gap-1 ${activeTab === 'breeding' ? 'bg-blue-600/30 px-6 rounded-md py-2' : ''}`}
          onClick={() => setActiveTab('breeding')}
        >
          <Heart size={16} /> Breeding
        </button>
        <button 
          className={`flex items-center gap-1 ${activeTab === 'genetics' ? 'bg-blue-600/30 px-6 rounded-md py-2' : ''}`}
          onClick={() => setActiveTab('genetics')}
        >
          <Tangent size={16} /> Genetics
        </button>
        <button 
          className={`flex items-center gap-1 ${activeTab === 'discoveries' ? 'bg-blue-600/30 px-6 rounded-md py-2' : ''}`}
          onClick={() => setActiveTab('discoveries')}
        >
          <SatelliteDish size={16} /> Discoveries
        </button>
        <button 
          className={`flex items-center gap-1 ${activeTab === 'genealogy' ? 'bg-blue-600/30 px-6 rounded-md py-2' : ''}`}
          onClick={() => setActiveTab('genealogy')}
        >
          <FileText size={16} /> Genealogy
        </button>
      </div>
    </nav>
  );
}