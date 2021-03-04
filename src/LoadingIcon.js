import * as React from "react";

function LoadingIcon(props) {
  const svgStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
  };
  return (
    <svg
      viewBox="0 0 100 100"
      style={svgStyle}
      height="75px"
      width="75px"
      id="loadingIcon"
    >
      <circle
        fill="none"
        stroke="#fff"
        strokeWidth={4}
        cx={50}
        cy={50}
        r={44}
        opacity={0.5}
      />
      <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default LoadingIcon;
