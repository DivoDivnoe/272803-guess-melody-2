import React from 'react';

const Preloader = () => {
  const style = {
    position: `absolute`,
    top: `57%`,
    left: `50%`,
    width: 64,
    height: 64,
    borderRadius: `50%`,
    background: `url('../img/plate.gif') center center no-repeat`,
    overflow: `hidden`,
    transform: `translate(-50%, -50%)`
  };

  return (
    <div className="preloader" style={style}>
    </div>
  );
};

Preloader.propTypes = {};

export default Preloader;
