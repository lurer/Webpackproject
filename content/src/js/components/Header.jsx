import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="row">
        <nav>
          <ul className="mainmenu">
            <li className="mainmenu--element"><Link to="/">Home</Link></li>
            <li className="mainmenu--element"><Link to="/product">Articles</Link></li>
            <li className="mainmenu--element"><Link to="/article">Products</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
