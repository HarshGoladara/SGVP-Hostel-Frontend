import React from 'react';
import './css/CustomCircularLoader.css';

const CustomCircularLoader = ({ logoSrc, size = 100 }) => {
  return (
    <div
      className="custom-loader"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="loader-ring"></div>
      <div className="logo-container">
        <img src={logoSrc} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default CustomCircularLoader;
