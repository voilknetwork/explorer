import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UserLink extends Component {
  render() {
    return (
      <Link to={`/@${this.props.author}`}>{` ${this.props.author} `}</Link>
    );
  }
}

UserLink.propTypes = {
  author: PropTypes.string
};

export default UserLink;
