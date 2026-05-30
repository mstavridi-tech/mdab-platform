"use client"
import * as React from "react"

type ColorVariant = "default" | "gold";

interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
}

const colorStyles: Record<ColorVariant, {
  wrapperBg: string;
  innerBg: string;
  buttonBg: string;
  color: string;
  textShadow: string;
}> = {
  default: {
    wrapperBg: "linear-gradient(to bottom, #000, #A0A0A0)",
    innerBg: "linear-gradient(to bottom, #FAFAFA, #3E3E3E, #E5E5E5)",
    buttonBg: "linear-gradient(to bottom, #B9B9B9, #969696)",
    color: "#ffffff",
    textShadow: "0 -1px 0 rgb(80 80 80 / 100%)",
  },
  gold: {
    wrapperBg: "linear-gradient(to bottom, #917100, #EAD98F)",
    innerBg: "linear-gradient(to bottom, #FFFDDD, #856807, #FFF1B3)",
    buttonBg: "linear-gradient(to bottom, #FFEBA1, #9B873F)",
    color: "#FFFDE5",
    textShadow: "0 -1px 0 rgb(178 140 2 / 100%)",
  },
};

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => (
  <div style={{
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    zIndex: 20,
    overflow: "hidden",
    borderRadius: "inherit",
    opacity: isPressed ? 0.2 : 0,
    transition: "opacity 300ms",
  }}>
    <div style={{
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      background: "linear-gradient(to right, transparent, #f5f5f5, transparent)",
    }} />
  </div>
);

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, variant = "default", style, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);

    React.useEffect(() => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const colors = colorStyles[variant];
    const transition = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

    return (
      <div style={{
        position: "relative",
        display: "inline-flex",
        borderRadius: "6px",
        padding: "1.25px",
        background: colors.wrapperBg,
        transform: isPressed ? "translateY(2px) scale(0.99)" : "translateY(0) scale(1)",
        boxShadow: isPressed
          ? "0 1px 2px rgba(0,0,0,0.15)"
          : isHovered && !isTouchDevice
            ? "0 6px 16px rgba(0,0,0,0.35)"
            : "0 3px 8px rgba(0,0,0,0.25)",
        transition,
        cursor: "pointer",
      }}>
        {/* inner gradient ring */}
        <div style={{
          position: "absolute",
          inset: "1px",
          borderRadius: "5px",
          background: colors.innerBg,
          transition,
          filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.08)" : "none",
        }} />
        {/* the actual button */}
        <button
          ref={ref}
          style={{
            position: "relative",
            zIndex: 10,
            margin: "1px",
            borderRadius: "5px",
            display: "inline-flex",
            height: "36px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: "none",
            outline: "none",
            cursor: "pointer",
            background: colors.buttonBg,
            color: colors.color,
            textShadow: colors.textShadow,
            transform: isPressed ? "scale(0.97)" : "scale(1)",
            filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.04)" : "none",
            transition,
            whiteSpace: "nowrap",
          }}
          {...props}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
          onMouseEnter={() => { if (!isTouchDevice) setIsHovered(true); }}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onTouchCancel={() => setIsPressed(false)}
        >
          <ShineEffect isPressed={isPressed} />
          {children}
        </button>
      </div>
    );
  }
);

MetalButton.displayName = "MetalButton";
