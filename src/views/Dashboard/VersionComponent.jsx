import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InfoItem from "../../components/InfoPanel/InfoItem";

class VersionComponent extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            version {
              blockchain_version
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <InfoItem
                info={{
                  icon_color: "icon icon-info",
                  icon: "fas fa-crown",
                  value: "Loading ...",
                  fname: "Chain Version"
                }}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <InfoItem
              info={{
                icon_color: "icon icon-info",
                icon: "fas fa-crown",
                value: data.version.blockchain_version,
                fname: "Chain Version"
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default VersionComponent;
