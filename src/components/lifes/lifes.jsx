import React from 'react';
import PropTypes from 'prop-types';

const Lifes = (props) => {
  const {mistakes} = props;

  return (
    <div className="game__mistakes">
      {Array.from(
          {length: mistakes},
          (_, index) => (<div className="wrong" key={`mistake-${index}`}></div>)
      )}
    </div>
  );
};

Lifes.propTypes = {
  mistakes: PropTypes.number.isRequired
};

export default Lifes;
