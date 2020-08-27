import React, { Component } from "react";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { CardCategory } from "components";
import Loading from "../../components/Loading/Loading";

const query = gql`
  {
    global_dynamic_properties {
      head_block_number
      time
      current_witness
      total_pow
      num_pow_witnesses
      virtual_supply
      current_supply
      confidential_supply
      current_vsd_supply
      total_coining_fund_voilk
      total_coining_shares
      total_reward_fund_voilk
      total_reward_shares2
      pending_rewarded_coining_voilk
      pending_rewarded_coining_shares
      vsd_interest_rate
      vsd_print_rate
      maximum_block_size
      current_aslot
      recent_slots_filled
      participation_count
      last_irreversible_block_num
      vote_power_reserve_rate
      delegation_return_period
      reverse_auction_seconds
      vsd_stop_percent
      vsd_start_percent
      average_block_size
      current_reserve_ratio
      max_virtual_bandwidth
    }
  }
`;
class DynamicProps extends Component {
  getDynamicChainProperties() {
    let data = this.props.data;
    if (data.loading) {
      return <Loading color={"white"} message={"Loading Dynamic Properties"} />;
    } else {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              {data.global_dynamic_properties.__typename}
            </CardCategory>
            <CardTitle tag="h4">
              {data.global_dynamic_properties.__typename}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className=" text-primary">
                <tr>
                  <th>Property Name</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.global_dynamic_properties).map(
                  (prop, key) => {
                    return (
                      <tr key={key}>
                        <td>{prop}</td>
                        <td className="text-right">
                          <Badge color="info">
                            {data.global_dynamic_properties[prop]}
                          </Badge>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    }
  }

  render() {
    return <div>{this.getDynamicChainProperties()}</div>;
  }
}

export default graphql(query)(DynamicProps);
