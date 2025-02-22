"use client";

import Button from "@/components/ui/button";
import ButtonLarge from "@/components/ui/button-large";

interface CardStoreProps {
  name?: string;
  itemImage?: string;
  price?: number;
  onInfoClick?: () => void;
  onBuyClick?: () => void;
}

export default function CardStore({
  name,
  itemImage,
  price,
  onInfoClick,
  onBuyClick,
}: CardStoreProps) {
  const handleInfoClick = () => {
    if (onInfoClick) {
      onInfoClick();
    }
  };

  const handleBuyClick = () => {
    if (onBuyClick) {
      onBuyClick();
    }
  };

  return (
    <div className="p-4 ">
      <section
        className="p-5 relative w-[300px] sm:w-[320px] md:w-[360px]  overflow-hidden rounded-2xl"
        style={{
          backgroundImage: 'url("/textures/panels/card-store.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" flex flex-col items-center border-2 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider pt-2 -mb-3">
            {name || "Redglow"}
          </h2>

          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={"/fish/fish-tank.svg"}
                alt="Item container"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={itemImage || "/fish/fish3.png"}
                alt={`${name} image`}
                className="w-40 h-40 object-contain transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex items-center justify-between gap-10 w-full">
          <div className="flex items-center h-fit">
            <img
              src="/textures/icons/Coins02Gold.svg"
              alt="Currency icon"
              className="w-16 h-auto object-contain"
            />
            <h3 className="font-semibold text-xl text-white">
              {price || 1500}
            </h3>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Button color="red" className="" onClick={handleInfoClick}>
              i
            </Button>
            <ButtonLarge
              color="green"
              className="uppercase p-2 w-full"
              onClick={handleBuyClick}
            >
              Buy
            </ButtonLarge>
          </div>
        </div>
      </section>
    </div>
  );
}
