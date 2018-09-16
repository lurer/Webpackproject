import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (

  <div className="row">
    <nav>
      <ul className="mainmenu">
        <li className="mainmenu--element"><Link to="/">Home</Link></li>
        <li className="mainmenu--element"><Link to="/article">Articles</Link></li>
        <li className="mainmenu--element"><Link to="/product">Products</Link></li>
      </ul>
    </nav>
  </div>
);

export default Header;
