import React from 'react';

const BlocksLoader = ({
  visible = true,
  width = '180',
  height = '180',
  wrapperClass = '',
  wrapperStyle = {},
  ariaLabel = 'blocks-loading',
  logoSrc,
}) => {
  if (!visible) {
    return null;
  }

  // Calculate position for centering the logo
  const logoSize = 50; // Set a size for the logo
  const logoX = (100 - logoSize) / 2; // Centering calculation for X
  const logoY = (100 - logoSize) / 2; // Centering calculation for Y

  return (
    <svg
      width={width}
      height={height}
      className={wrapperClass}
      style={wrapperStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      aria-label={ariaLabel}
      data-testid="blocks-svg"
    >
      <title>Blocks</title>
      <desc>Animated representation of blocks</desc>
      <rect x="17" y="17" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        />
      </rect>
      <rect x="40" y="17" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          calcMode="discrete"
        />
      </rect>
      <rect x="63" y="17" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        />
      </rect>
      <rect x="17" y="40" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          calcMode="discrete"
        />
      </rect>
      <rect x="63" y="40" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          calcMode="discrete"
        />
      </rect>
      <rect x="17" y="63" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        />
      </rect>
      <rect x="40" y="63" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        />
      </rect>
      <rect x="63" y="63" width="20" height="20" fill="#577c9b">
        <animate
          attributeName="fill"
          values="#0dceff;#577c9b;#577c9b"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        />
      </rect>

      {logoSrc && (
        <image
          href={logoSrc}
          x={logoX}
          y={logoY}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </svg>
  );
};

export default BlocksLoader;
