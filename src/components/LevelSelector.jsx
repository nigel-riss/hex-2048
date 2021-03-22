import React from 'react';
import {Link} from 'react-router-dom';


const LevelSelector = () => {
  return (
    <div className="level-selector">
      <p>Select radius:&nbsp;</p>
      <Link
        to="#test2"
        className="level-selector__link"
      >
        2
      </Link>

      <Link
        to="#test3"
        className="level-selector__link"
      >
        3
      </Link>

      <Link
        to="#test4"
        className="level-selector__link"
      >
        4
      </Link>

      <Link
        to="#test5"
        className="level-selector__link"
      >
        5
      </Link>
    </div>
  );
};


export default LevelSelector;
