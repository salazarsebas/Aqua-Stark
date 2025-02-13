type FishProps = {
    id: string;
    name: string;
    image: string;
    position: { x: number; y: number };
    nftMetadata: {
      rarity: string;
      generation: number;
      traits: string[];
    };
  };
  
  export default function Fish({ name, image, position, nftMetadata }: FishProps) {
    return (
      <div
        className="absolute flex flex-col items-center"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      >
        <img
          src={image}
          alt={name}
          className="w-40 h-40 transition-transform duration-500 hover:scale-110"
        />
        <div className="bg-black bg-opacity-50 text-white text-xs text-center mt-1 p-1 rounded">
          <p className="font-bold">{name}</p>
          <p>Rarity: <span className="font-semibold">{nftMetadata.rarity}</span></p>
          <p>Gen: <span className="font-semibold">{nftMetadata.generation}</span></p>
        </div>
      </div>
    );
  }
  