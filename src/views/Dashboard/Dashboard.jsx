import React from "react";

import { PanelHeader } from "components";

import StatsPanel from "../../components/InfoPanel/StatsPanel";
import UserCount from "./UserCount";
import PriceComponent from "./PriceComponent";
import VersionComponent from "./VersionComponent";
import WitnessCount from "./WitnessCount";
import NewestBlocks from "./NewestBlocks";
import ActiveWitnesses from "./ActiveWitnesses";
import LineChart from "./LineChart";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Transactions from "./Transactions";
import { Loading } from "../../components";

class Dashboard extends React.Component {


  render() {
    return (
      <Query
        query={gql`
          {
            global_dynamic_properties {
              head_block_number
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Loading
                color={"blue"}
                message={"Getting Block Header ..."}
                header={true}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <Query
              query={gql`
                {
                  blocks(block_header: ${
                    data.global_dynamic_properties.head_block_number
                  }, limit: 10) {
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
                      color={"skyblue"}
                      message={"Getting Blocks Data ..."}
                      header={true}
                    />
                  );
                if (error) return <p>Error :(</p>;

                return (
                  <React.Fragment>
                    <PanelHeader
                      size="lg"
                      content={<LineChart data={data} />}
                    />
                    <div className="content">
                      <StatsPanel>
                        <UserCount />
                        <PriceComponent />
                        <WitnessCount />
                        <VersionComponent />
                      </StatsPanel>
                      <div className="row">
                        <NewestBlocks data={data} />
                        <ActiveWitnesses />
                      </div>
                      <div className={"row"}>
                        <Transactions data={data} />
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
