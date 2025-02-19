import React from "react";

export type ButtonColor = "blue" | "red" | "green" | "yellow" | "teal" | "inactive";

const buttonVariantsLarge: Record<ButtonColor, { normal: string; hover: string; active: string }> = {
  blue: {
    normal: "/textures/buttons/large/ButtonDarkBlueLarge.svg",
    hover: "/textures/buttons/large/ButtonDarkBlueHoverLarge.svg",
    active: "/textures/buttons/large/ButtonDarkBlueDownLarge.svg",
  },
  red: {
    normal: "/textures/buttons/large/ButtonRedLarge.svg",
    hover: "/textures/buttons/large/ButtonRedHoverLarge.svg",
    active: "/textures/buttons/large/ButtonRedDownLarge.svg",
  },
  green: {
    normal: "/textures/buttons/large/ButtonGreenLarge.svg",
    hover: "/textures/buttons/large/ButtonGreenHoverLarge.svg",
    active: "/textures/buttons/large/ButtonGreenDownLarge.svg",
  },
  yellow: {
    normal: "/textures/buttons/large/ButtonYellowLarge.svg",
    hover: "/textures/buttons/large/ButtonYellowHoverLarge.svg",
    active: "/textures/buttons/large/ButtonYellowDownLarge.svg",
  },
  teal: {
    normal: "/textures/buttons/large/ButtonTealLarge.svg",
    hover: "/textures/buttons/large/ButtonTealHoverLarge.svg",
    active: "/textures/buttons/large/ButtonTealDownLarge.svg",
  },
  inactive: {
    normal: "/textures/buttons/large/ButtonInactiveLarge.svg",
    hover: "/textures/buttons/large/ButtonInactiveLarge.svg",
    active: "/textures/buttons/large/ButtonInactiveLarge.svg",
  },
};

interface ButtonLargeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  size?: "small" | "large";
  children?: React.ReactNode;
}

const ButtonLarge: React.FC<ButtonLargeProps> = ({ color = "blue", size = "large", children, className = "", ...props }) => {
  const variant = buttonVariantsLarge[color];
  const sizeClass = size === "large" ? "w-[120px] h-[120px]" : "w-[80px] h-[80px]";

  return (
    <button
      className={`relative flex items-center justify-center text-white text-lg font-semibold transition-transform transform active:scale-95 bg-no-repeat bg-center bg-contain ${sizeClass} ${className}`}
      style={{ backgroundImage: `url(${variant.normal})` }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${variant.hover})`)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${variant.normal})`)}
      onMouseDown={(e) => (e.currentTarget.style.backgroundImage = `url(${variant.active})`)}
      onMouseUp={(e) => (e.currentTarget.style.backgroundImage = `url(${variant.hover})`)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonLarge;