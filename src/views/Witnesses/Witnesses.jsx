import React from "react";

import { PanelHeader } from "components";

import StatsPanel from "../../components/InfoPanel/StatsPanel";
import UserCount from "../Dashboard/UserCount";
import PriceComponent from "../Dashboard/PriceComponent";
import VersionComponent from "../Dashboard/VersionComponent";
import InfoItem from "../../components/InfoPanel/InfoItem";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Loading } from "../../components";
import { CardCategory } from "components";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import UserLink from "../Member/UserLink";

class Witnesses extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          {
            active_witnesses {
              name
              account {
                reputation
                coining_shares
                voting_manabar {
                  current_mana
                }
                json_metadata {
                  profile_image
                  website
                  location
                  about
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Loading
                color={"skyblue"}
                message={"Getting Witnesses Data ..."}
                header={true}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <React.Fragment>
              <PanelHeader size="sm" />
              <div className="content">
                <StatsPanel>
                  <UserCount />
                  <PriceComponent />
                  <InfoItem
                    info={{
                      icon_color: "icon icon-warning",
                      icon: "fas fa-user-secret",
                      value: data.active_witnesses.length,
                      fname: "Active"
                    }}
                  />
                  <VersionComponent />
                </StatsPanel>
                <div className="row">
                  <div className="col-lg-12">
                    <Card>
                      <CardHeader>
                        <CardCategory>
                          Total Active Witnesses{" "}
                          <Badge color={"success"}>
                            {data.active_witnesses.length}
                          </Badge>
                        </CardCategory>
                        <CardTitle tag={"h4"}>Active Witnesses</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Table>
                          {data.active_witnesses.map((witness, key) => (
                            <tr key={key}>
                              <td>{key+1}</td>
                              <td>
                                <img
                                  height="50px"
                                  width="50px"
                                  src={
                                    witness.account.json_metadata.profile_image
                                  }
                                  alt="..."
                                />
                              </td>
                              <td className={"text-left"}>
                                <b>
                                  <UserLink author={witness.name} />
                                </b>
                                <p>
                                  Share Power: <b>{witness.account.coining_shares}</b>
                                </p>
                              </td>
                              <td>
                                {witness.account.json_metadata.location}
                              </td>
                              <td className={"text-left"}>
                                {witness.account.json_metadata.website !==
                                null ? (
                                  <Badge color="warning">
                                    <a
                                      href={
                                        witness.account.json_metadata.website
                                      }
                                    >
                                      Website
                                    </a>
                                  </Badge>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Witnesses;
