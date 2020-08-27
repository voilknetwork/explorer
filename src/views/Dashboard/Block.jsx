import React, { Component } from "react";
import PropTypes from "prop-types";

import { Badge } from "reactstrap";
import UserLink from "../Member/UserLink";
import BlockLink from "./BlockLink";

class Block extends Component {
  render() {
    return (
      <tr>
        <td>
          <Badge color="warning"><BlockLink block_id={this.props.data.height} /></Badge>
        </td>
        <td>
          {this.props.data.block_id}
        </td>
        <td>
          <UserLink author={this.props.data.witness} />
        </td>
        <td>{this.props.data.timestamp}</td>
        <td className="text-right">
          <Badge color="primary">{this.props.data.transactions.length}</Badge>
        </td>
      </tr>
    );
  }
}

Block.propTypes = {
  data: PropTypes.string
};

export default Block;
