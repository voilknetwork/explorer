import React, { Component } from "react";
import PropTypes from "prop-types";
import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Transaction from "./Transaction";
import { CardCategory } from "components";
class Transactions extends Component {
  render() {
    return (
      <div className="col-lg-12">
        <Card>
          <CardHeader>
            <CardCategory>Recent Transcations</CardCategory>
            <CardTitle tag="h4">
              Transactions in recent{" "}
              <Badge color={"success"}>{this.props.data.blocks.length} </Badge>
              {" Blocks"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            {this.props.data.blocks.reverse().map((block, key) => {
              return <Transaction key={key} data={block} />;
            })}
          </CardBody>
        </Card>
      </div>
    );
  }
}

Transactions.propTypes = {
  data: PropTypes.object
};

export default Transactions;
