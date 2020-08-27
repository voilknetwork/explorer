import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Badge
} from "reactstrap";
import { CardCategory } from "components";
import Block from "./Block";
import PropTypes from "prop-types";

class NewestBlocks extends Component {
  getBlock(recent_block) {
    return <Block data={recent_block} />;
  }
  render() {
    return (
      <div className="col-lg-8">
        <Card>
          <CardHeader>
            <CardCategory>
              Latest Block:
              {this.props.data.blocks[this.props.data.blocks.length - 1].height}
            </CardCategory>
            <CardTitle tag="h4">
              Block Hash:
              <Badge color={"success"}>
                {" "}
                {
                  this.props.data.blocks[this.props.data.blocks.length - 1]
                    .block_id
                }
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className=" text-primary">
                <tr>
                  <th>Block</th>
                  <th>Hash</th>
                  <th>Witness</th>
                  <th>TimeStamp</th>
                  <th className="text-right">Txs</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.blocks
                  .reverse()
                  .slice(0, 11)
                  .map((block, key) => {
                    return <Block key={key} data={block} />;
                  })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}
Block.propTypes = {
  data: PropTypes.string
};
export default NewestBlocks;
