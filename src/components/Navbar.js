import React, { Component } from "react";
import { Link } from "@reach/router";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            DeepFace - FrontEnd in development
          </Link>
        </nav>
      </header>
    );
  }
}

export default Navbar;
