import React, { Component } from "react";

import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import { CardCategory } from "components";
import PropTypes from "prop-types";

class LatestBlock extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-xs-24 col-lg-12">
          <Card>
            <CardHeader>
              <CardCategory>
                Latest {this.props.data.blocks[0].__typename} :{" "}
                {this.props.data.blocks[0].height}
              </CardCategory>
              <CardTitle tag="h4">
                {this.props.data.blocks[0].__typename} Hash:{" "}
                {this.props.data.blocks[0].block_id}
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
                      return null;
                    }
                    return (
                      <tr key={key}>
                        <td>{prop}</td>
                        <td className="text-left">
                          {this.props.data.blocks[0][prop]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
LatestBlock.propTypes = {
  // Where the user to be redirected on clicking the avatar
  data: PropTypes.object
};
export default LatestBlock;
