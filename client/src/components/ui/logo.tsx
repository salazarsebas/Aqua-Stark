type LogoProps = {
    size?: number;
  };
  
  export default function Logo({ size = 64 }: LogoProps) {
    return (
      <div className={`w-[${size}px] h-[${size}px] transition-transform duration-300 hover:scale-110`}>
        <img
          src="/logo/aqua-stark.png"
          alt="Aqua Stark Logo"
          width={size}
          height={size}
        />
      </div>
    );
  }
  