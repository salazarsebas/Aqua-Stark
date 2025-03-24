
import React, { useState } from 'react';

import { FaCalculator, FaDna } from 'react-icons/fa';

const GeneticCombinationsPage: React.FC = () => {
  const [selectedPair, _setSelectedPair] = useState<string | null>(null);
  
  
  const rarityData = [
    { level: 'Common', chance: 20, color: '#8E8E8E' },
    { level: 'Uncommon', chance: 35, color: '#4CAF50' },
    { level: 'Rare', chance: 50, color: '#2196F3' },
    { level: 'Epic', chance: 65, color: '#9C27B0' },
    { level: 'Legendary', chance: 80, color: '#FFC107' },
  ];

  return (
    <div className=" text-white">
    
      <div className="container mx-auto px-6 py-6">
        {/* Header with Title and Action Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Genetic Combinations</h1>
          <button className="flex items-center bg-purple-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-colors">
            <FaCalculator className="mr-2" />
            <span>Trait Calculator</span>
          </button>
        </div>
        
        {/* Breeding Pair Section */}
        <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-blue-600/50">
          <h2 className="text-lg font-medium mb-4">Breeding Pair Genetics</h2>
          
          {/* No Selection State */}
          {!selectedPair && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-700/50 border border-blue-500/50">
                <FaDna className="w-8 h-8 text-blue-300 opacity-70" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Breeding Pair Selected</h3>
              <p className="text-sm text-blue-200 max-w-md mb-6">
                Select a breeding pair in the Breeding tab to view genetic combinations.
              </p>
              <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-md border border-white/30 transition-colors">
                Go to Breeding Tab
              </button>
            </div>
          )}
        </div>
        
        {/* Trait Inheritance Guide */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Trait Inheritance Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Inheritance */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border border-blue-600/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-blue-300 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-md font-medium">Color Inheritance</h3>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Colors typically follow dominant/recessive patterns. Primary colors (red, blue, yellow) are 
                more dominant than secondary colors.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="w-full h-6 bg-red-500 rounded mb-1"></div>
                  <span className="text-xs">Red</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-blue-500 rounded mb-1"></div>
                  <span className="text-xs">Blue</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-yellow-500 rounded mb-1"></div>
                  <span className="text-xs">Yellow</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-green-500 rounded mb-1"></div>
                  <span className="text-xs">Green</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-purple-500 rounded mb-1"></div>
                  <span className="text-xs">Purple</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-orange-500 rounded mb-1"></div>
                  <span className="text-xs">Orange</span>
                </div>
              </div>
            </div>
            
            {/* Pattern Inheritance */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border border-blue-600/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-blue-300 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-md font-medium">Pattern Inheritance</h3>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Patterns can blend or be inherited whole. Solid patterns are recessive, while complex 
                patterns like spots or stripes are dominant.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="w-full h-6 bg-blue-400 rounded mb-1"></div>
                  <span className="text-xs">Solid</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-blue-400 rounded mb-1 bg-opacity-70 bg-dotted"></div>
                  <span className="text-xs">Spotted</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-blue-400 rounded mb-1 bg-striped"></div>
                  <span className="text-xs">Striped</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-gradient-to-r from-blue-300 to-blue-600 rounded mb-1"></div>
                  <span className="text-xs">Gradient</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-blue-400 rounded mb-1 bg-metallic"></div>
                  <span className="text-xs">Metallic</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-6 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-400 rounded mb-1 bg-marbled"></div>
                  <span className="text-xs">Marbled</span>
                </div>
              </div>
            </div>
            
            {/* Special Traits */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border border-blue-600/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-blue-300 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <h3 className="text-md font-medium">Special Traits</h3>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Special traits have a low chance of being passed down. When both parents have special 
                traits, there's a higher chance of inheritance.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-800/30 p-2 rounded flex justify-center items-center">
                  <span className="text-sm font-medium text-blue-100">Bioluminescent</span>
                </div>
                <div className="bg-blue-800/30 p-2 rounded flex justify-center items-center">
                  <span className="text-sm font-medium text-blue-100">Fast</span>
                </div>
                <div className="bg-blue-800/30 p-2 rounded flex justify-center items-center">
                  <span className="text-sm font-medium text-blue-100">Shimmering</span>
                </div>
                <div className="bg-blue-800/30 p-2 rounded flex justify-center items-center">
                  <span className="text-sm font-medium text-blue-100">Electric</span>
                </div>
              </div>
            </div>
            
            {/* Rarity Influence */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border border-blue-600/50">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center text-blue-300 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-md font-medium">Rarity Influence</h3>
              </div>
              <p className="text-sm text-blue-200 mb-4">
                Higher rarity fish have a better chance of passing down their traits. Breeding two high-rarity
                fish increases the chance of rare offspring.
              </p>
              <div className="space-y-2">
                {rarityData.map((rarity) => (
                  <div key={rarity.level} className="flex items-center">
                    <span className="text-xs w-16">{rarity.level}</span>
                    <div className="flex-1 h-4 bg-blue-900/50 rounded-full overflow-hidden mx-2">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${rarity.chance}%`,
                          backgroundColor: rarity.color
                        }}
                      ></div>
                    </div>
                    <span className="text-xs w-8 text-right">{rarity.chance}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneticCombinationsPage;