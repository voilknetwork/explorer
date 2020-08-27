import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BlockLink extends Component {
  render() {
    return (
      <Link to={`/${this.props.block_id}`}>{` ${this.props.block_id} `}</Link>
    );
  }
}

BlockLink.propTypes = {
  block_id: PropTypes.string
};

export default BlockLink;
