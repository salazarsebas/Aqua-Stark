import Button from "@/components/ui/button"; 

export default function SideMenu() {
  return (
    <div className="absolute right-4 top-20 flex flex-col space-y-2 md:right-10 md:top-36">
     
<Button color="teal" iconSrc="/textures/icons/Chest02.svg" className="md:w-12 md:h-12 w-6 h-6 flex items-center justify-center p-1" />
<Button
  color="yellow"
  className="md:w-12 md:h-12 w-6 h-6 flex items-center justify-center p-1"
>
  <div className="rounded-full bg-white flex items-center justify-center md:w-6 md:h-6 w-5 h-5">
    <img src="/textures/icons/StarOrange.svg" alt="icon" className="md:w-5 md:h-5 w-4 h-4" />
  </div>
</Button>
<Button color="red" iconSrc="/textures/icons/Chat.svg" className="md:w-12 md:h-12 w-6 h-6 flex items-center justify-center p-1" />
<Button color="green" iconSrc="/textures/icons/Book01.svg" className="md:w-12 md:h-12 w-6 h-6 flex items-center justify-center p-1" />
        
          
          
           </div>
    
   
  );
}
