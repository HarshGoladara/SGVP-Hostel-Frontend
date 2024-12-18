// import React from "react";
// import PropTypes from "prop-types";

// export const HairballSpinner = ({
//   colors = {
//     fillColor1: "#c0392b",
//     fillColor2: "#d35400",
//     fillColor3: "#f39c12",
//     fillColor4: "#16a085",
//   },
//   backgroundColor = "#fff",
//   speed = 2,
//   width = 100,
//   height = 100,
//   visible = true,
//   ariaLabel = "Hairball loading",
//   wrapperClass = "",
//   wrapperStyle = {},
// }) => {
//   const { fillColor1, fillColor2, fillColor3, fillColor4 } = colors;

//   if (!visible) {
//     return null;
//   }

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         margin: "auto",
//         background: backgroundColor,
//         display: "block",
//         ...wrapperStyle,
//       }}
//       width={width}
//       height={height}
//       aria-label={ariaLabel}
//       className={wrapperClass}
//       viewBox="0 0 100 100"
//       preserveAspectRatio="xMidYMid"
//       role="progressbar"
//     >
//       <g transform="translate(50,50)">
//         <g transform="scale(0.8)">
//           <g transform="translate(-50,-50)">
//             <g>
//               <animateTransform
//                 attributeName="transform"
//                 type="rotate"
//                 repeatCount="indefinite"
//                 values="0 50 50;360 50 50"
//                 keyTimes="0;1"
//                 dur={`${speed}s`}
//                 keySplines="0.5 0.5 0.5 0.5"
//                 calcMode="spline"
//               ></animateTransform>

//               <path
//                 fill={fillColor1}
//                 d="M51.8,9.9c-8.2-6.6-20.5-4.3-26,4.5c1.9-0.3,3.8-0.4,5.7-0.1c9.9-5.7,22.9-0.9,26.9,9.8 C58.5,18.7,56.1,13.4,51.8,9.9z"
//               ></path>
//               <path
//                 fill={fillColor2}
//                 d="M44.1,23c-4-6.9-12.3-10.3-20-8.1c-7.4,2-12.6,8.8-12.8,16.5c1.5-1.2,3.1-2.2,4.9-2.9 c5.7-9.8,19.4-12.2,28.1-5C44.3,23.3,44.2,23.1,44.1,23z"
//               ></path>
//               <path
//                 fill={fillColor3}
//                 d="M31.4,29.5c-6.8-3.9-15.6-2.8-21.1,2.7c-5.6,5.4-6.8,14.1-3.1,20.9c0.7-1.8,1.6-3.5,2.8-5 c0-11.4,10.7-20.3,21.9-18.4C31.7,29.7,31.5,29.6,31.4,29.5z"
//               ></path>
//               <path
//                 fill={fillColor4}
//                 d="M12.1,57c0.8-7.1,5.6-13,12.1-15.4c-8.1-0.2-15.4,5.2-17.5,13c-2,7.5,1.2,15.5,7.8,19.6 c-0.3-1.9-0.4-3.8-0.1-5.7C12.4,65,11.6,61,12.1,57z"
//               ></path>
//             </g>
//           </g>
//         </g>
//       </g>
//     </svg>
//   );
// };

// HairballSpinner.propTypes = {
//   colors: PropTypes.shape({
//     fillColor1: PropTypes.string,
//     fillColor2: PropTypes.string,
//     fillColor3: PropTypes.string,
//     fillColor4: PropTypes.string,
//   }),
//   backgroundColor: PropTypes.string,
//   speed: PropTypes.number,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   visible: PropTypes.bool,
//   ariaLabel: PropTypes.string,
//   wrapperClass: PropTypes.string,
//   wrapperStyle: PropTypes.object,
// };

// export default HairballSpinner;

import React from 'react';
import PropTypes from 'prop-types';

export const HairballSpinner = ({
  colors = {
    fillColor1: '#c0392b',
    fillColor2: '#d35400',
    fillColor3: '#f39c12',
    fillColor4: '#16a085',
  },
  backgroundColor = '#fff',
  speed = 2,
  width = 100,
  height = 100,
  visible = true,
  ariaLabel = 'Hairball loading',
  wrapperClass = '',
  wrapperStyle = {},
  logoSrc = '', // Path to the logo image
  logoSize = 30, // Size of the circular logo
}) => {
  const { fillColor1, fillColor2, fillColor3, fillColor4 } = colors;

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        display: 'inline-block',
      }}
      className={wrapperClass}
    >
      {/* Spinner SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: 'auto',
          background: backgroundColor,
          display: 'block',
          ...wrapperStyle,
        }}
        width={width}
        height={height}
        aria-label={ariaLabel}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        role="progressbar"
      >
        <g transform="translate(50,50)">
          <g transform="scale(0.8)">
            <g transform="translate(-50,-50)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                  dur={`${speed}s`}
                  keySplines="0.5 0.5 0.5 0.5"
                  calcMode="spline"
                ></animateTransform>
                <path
                  fill={fillColor1}
                  d="M51.8,9.9c-8.2-6.6-20.5-4.3-26,4.5c1.9-0.3,3.8-0.4,5.7-0.1c9.9-5.7,22.9-0.9,26.9,9.8 C58.5,18.7,56.1,13.4,51.8,9.9z"
                ></path>
                <path
                  fill={fillColor2}
                  d="M44.1,23c-4-6.9-12.3-10.3-20-8.1c-7.4,2-12.6,8.8-12.8,16.5c1.5-1.2,3.1-2.2,4.9-2.9 c5.7-9.8,19.4-12.2,28.1-5C44.3,23.3,44.2,23.1,44.1,23z"
                ></path>
                <path
                  fill={fillColor3}
                  d="M31.4,29.5c-6.8-3.9-15.6-2.8-21.1,2.7c-5.6,5.4-6.8,14.1-3.1,20.9c0.7-1.8,1.6-3.5,2.8-5 c0-11.4,10.7-20.3,21.9-18.4C31.7,29.7,31.5,29.6,31.4,29.5z"
                ></path>
                <path
                  fill={fillColor4}
                  d="M12.1,57c0.8-7.1,5.6-13,12.1-15.4c-8.1-0.2-15.4,5.2-17.5,13c-2,7.5,1.2,15.5,7.8,19.6 c-0.3-1.9-0.4-3.8-0.1-5.7C12.4,65,11.6,61,12.1,57z"
                ></path>
                <path
                  fill={fillColor1}
                  d="M28.4,83.8c-9.8-5.7-12.2-19.4-5-28.1c-7.1,3.8-10.7,12.2-8.6,20c2,7.5,8.8,12.8,16.5,13 C30.1,87.2,29.1,85.6,28.4,83.8z"
                ></path>
                <path
                  fill={fillColor2}
                  d="M48.2,90.1c-11.4,0-20.3-10.7-18.4-21.9c-4.2,6.8-3.2,15.6,2.3,21.4c5.4,5.7,14.2,7,21.1,3.3 C51.4,92.2,49.7,91.2,48.2,90.1z"
                ></path>
                <path
                  fill={fillColor3}
                  d="M68.5,85.6c-9.9,5.7-22.9,0.9-26.9-9.8c-0.2,8.1,5.2,15.4,13,17.5c7.5,2,15.5-1.2,19.6-7.8 C72.3,85.8,70.4,85.9,68.5,85.6z"
                ></path>
                <path
                  fill={fillColor4}
                  d="M83.8,71.6c-5.7,9.8-19.4,12.2-28.1,5c3.8,7.1,12.2,10.7,20,8.6c7.5-2,12.8-8.8,13-16.5 C87.2,69.9,85.6,70.9,83.8,71.6z"
                ></path>
                <path
                  fill={fillColor1}
                  d="M92.9,46.8c-0.7,1.8-1.6,3.5-2.8,5c0,11.4-10.7,20.3-21.9,18.4c6.8,4.2,15.6,3.2,21.4-2.3 C95.3,62.5,96.6,53.7,92.9,46.8z"
                ></path>
                <path
                  fill={fillColor2}
                  d="M85.5,25.8c0.3,1.9,0.4,3.8,0.1,5.7c5.7,9.9,0.9,22.9-9.8,26.9c8.1,0.2,15.4-5.2,17.5-13 C95.3,37.9,92.1,29.8,85.5,25.8z"
                ></path>
                <path
                  fill={fillColor3}
                  d="M71.6,16.2C67.8,6.4,56,2.2,46.8,7.1c1.8,0.7,3.5,1.6,5,2.8c11.4,0,20.3,10.7,18.4,21.9 C73.1,27.1,73.6,21.3,71.6,16.2z"
                ></path>
                <path
                  fill={fillColor4}
                  d="M85.5,25.8c-1.4-8.2-8.6-14.3-16.9-14.5c1.2,1.5,2.2,3.1,2.9,4.9c9.8,5.7,12.2,19.4,5,28.1 C83.2,40.7,86.8,33.2,85.5,25.8z"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      {/* Logo in the center */}
      {logoSrc && (
        <img
          src={logoSrc}
          alt="spinner-logo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: logoSize,
            height: logoSize,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  );
};

HairballSpinner.propTypes = {
  colors: PropTypes.shape({
    fillColor1: PropTypes.string,
    fillColor2: PropTypes.string,
    fillColor3: PropTypes.string,
    fillColor4: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  speed: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  visible: PropTypes.bool,
  ariaLabel: PropTypes.string,
  wrapperClass: PropTypes.string,
  wrapperStyle: PropTypes.object,
  logoSrc: PropTypes.string,
  logoSize: PropTypes.number,
};

export default HairballSpinner;