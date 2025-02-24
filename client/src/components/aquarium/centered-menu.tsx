import { useEffect, useRef } from "react";
import Button from "../ui/button";

type CenteredMenuProps = {
  onClose: () => void;
};

export default function CenteredMenu({ onClose }: CenteredMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={menuRef} className="bg-blue-600 rounded-2xl p-6 w-[350px] relative shadow-lg">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-900 rounded-xl px-24 py-2 shadow-[0_4px_0px_#08316b]">
          <p className="text-white font-bold text-3xl">MENU</p>
        </div>
        <Button iconSrc="/textures/icons/X.svg" color="red" onClick={onClose} className="absolute -top-[2.3rem] left-[18rem] md:w-12 md:h-12 w-6 h-6 flex items-center justify-center p-1" />


        <div className="grid grid-cols-3 gap-2 mt-8">
          {[...Array(9)].map((_, index) => (
            <Button
              key={index}
              onClick={onClose}
              color="blue"
              iconSrc={
                index === 6
                  ? "/textures/icons/Chest02.svg"
                  : index === 7
                  ? "/textures/icons/StarOrange.svg"
                  : index === 8
                  ? "/textures/icons/Chat.svg"
                  : undefined
              }
              className="!w-24 !h-24 !rounded-2xl !p-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}