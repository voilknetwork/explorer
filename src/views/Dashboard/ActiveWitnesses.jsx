import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
  Card,
  CardBody,
  Badge,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { CardCategory } from "components";
import Loading from "../../components/Loading/Loading";
import UserLink from "../Member/UserLink";
class ActiveWitnesses extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            active_witnesses {
              name
              account {
                reputation
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
              <Loading color={"white"} message={"Getting Witnesses ... "} />
            );
          if (error) return <p>Error :(</p>;

          return (
            <div className="col-lg-4">
              <Card>
                <CardHeader>
                  <CardCategory>
                    Total Active Witnesses{" "}
                    <Badge color={"success"}>
                      {data.active_witnesses.length}
                    </Badge>
                  </CardCategory>
                  <CardTitle tag={"h4"}>
                    Displaying 4 recent witnesses
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {data.active_witnesses.slice(0, 4).map((witness, key) => (
                    <Table key={key}>
                      <tr>
                        <td>
                          <img
                            height="50px"
                            width="50px"
                            src={witness.account.json_metadata.profile_image}
                            alt="..."
                          />
                          <br />
                          <br />
                          <b>
                            <UserLink author={witness.name} />
                          </b>
                        </td>
                        <td className={"text-right"}><Badge color="info">
                          Witness
                        </Badge>
                          <br />
                          <Badge color="warning">
                            <a href={witness.account.json_metadata.website}>
                              Website
                            </a>
                          </Badge><br />
                          <Badge color="info">
                            {witness.account.json_metadata.location}
                          </Badge>
                        </td>
                      </tr>
                    </Table>
                  ))}
                </CardBody>
              </Card>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ActiveWitnesses;
