import React, { Component } from "react";
import { Loading, PanelHeader } from "../../components";
import StatsPanel from "../../components/InfoPanel/StatsPanel";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LatestBlock from "../Dashboard/LatestBlock";
import LatestBlockTransactions from "../Dashboard/LatestBlockTransactions";
import InfoItem from "../../components/InfoPanel/InfoItem";
import UserLink from "../Member/UserLink";

class Blocks extends Component {
  render() {
    return (
      <Query
        query={gql`
                {
                  blocks(block_header: ${
                    this.props.match.params.block
                  }, limit: 1) {
                        height
                        block_id
                        previous
                        timestamp
                        witness
                        transaction_merkle_root
                        extensions
                        witness_signature
                        transactions
                        {
                          ref_block_num
                          ref_block_prefix
                          expiration
                          operations
                          extensions
                          signatures
                          transaction_id
                          block_num
                          transaction_num
                        }
                        signing_key
                        transaction_ids
                        transactions_count
                  }
                }
    `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Loading
                header={true}
                color={"white"}
                message={"Searching for Block..."}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <React.Fragment>
              <PanelHeader size={"sm"} />
              <div className="content">
                <StatsPanel>
                  <InfoItem
                    info={{
                      icon_color: "icon icon-primary",
                      icon: "fas fa-chalkboard",
                      value: data.blocks[0].height,
                      fname: "Block Height"
                    }}
                  />
                  <InfoItem
                    info={{
                      icon_color: "icon icon-warning",
                      icon: "fas fa-user-secret",
                      value: <UserLink author={data.blocks[0].witness}/>,
                      fname: "Witness"
                    }}
                  />
                  <InfoItem
                    info={{
                      icon_color: "icon icon-success",
                      icon: "fas fa-chart-pie",
                      value: data.blocks[0].transactions_count,
                      fname: "Transactions Count"
                    }}
                  />
                  <InfoItem
                    info={{
                      icon_color: "icon icon-info",
                      icon: "fas fa-clock",
                      value: "Time",
                      fname: data.blocks[0].timestamp
                    }}
                  />
                </StatsPanel>
                <div className={"row"}>
                  <LatestBlock data={data} />
                  <LatestBlockTransactions data={data} />
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

Blocks.propTypes = {};

export default Blocks;
