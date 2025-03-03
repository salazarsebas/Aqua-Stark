import Button from "@/components/ui/button";

export default function SideMenu() {
  return (
    <div className="absolute right-2 md:right-8 top-20 flex flex-col space-y-2 md:top-36">
      <Button color="teal" size="medium" iconSrc="/textures/icons/Chest02.svg" />
      <Button color="yellow" size="medium" iconSrc="/textures/icons/Chat.svg" />
      <Button color="red" size="medium" iconSrc="/textures/icons/Chat.svg" /> 
      <Button color="green" size="medium" iconSrc="/textures/icons/Book01.svg" />
    </div>
  );
}

