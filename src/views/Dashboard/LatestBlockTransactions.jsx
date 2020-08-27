import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { CardCategory } from "components";
class LatestBlockTransactions extends Component {
  render() {
    return (
      <div className="col-xs-24 col-lg-12">
        <Card>
          <CardHeader>
            <CardCategory>
              Transactions in {this.props.data.blocks[0].__typename}
            </CardCategory>
            <CardTitle tag="h4">
              Transactions in {this.props.data.blocks[0].__typename}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className=" text-primary">
                <tr>
                  <th>Property Name</th>
                  <th className="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.data.blocks[0]).map((prop, key) => {
                  if (prop === "transactions") {
                    return (
                      <tr key={key}>
                        <td>{prop}</td>
                        <td className="text-left">
                          {this.props.data.blocks[0][prop].map((prop1, key) => {
                            return (
                              <Card key={key}>
                                {Object.keys(prop1).map((prop, key) => {
                                  if (prop === "operations") {
                                    return (
                                      <CardBody>
                                        <Badge color="danger">
                                          {prop1[prop]}
                                        </Badge>
                                      </CardBody>
                                    );
                                  }
                                  return (
                                    <CardBody key={key}>
                                      <Badge color="warning">
                                        {prop1[prop]}
                                      </Badge>
                                    </CardBody>
                                  );
                                })}
                              </Card>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

LatestBlockTransactions.propTypes = { data: PropTypes.object };

export default LatestBlockTransactions;
