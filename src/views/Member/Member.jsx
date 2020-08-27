import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Badge,
  Table
} from "reactstrap";
import { PanelHeader, CardAuthor, CardCategory } from "components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../../components/Loading/Loading";
import InfoBar from "./InfoBar";
import UserLink from "./UserLink";
import Notification from "../../components/Notification/Notification";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Chitika from "../../variables/chitika";

class Member extends React.Component {
  get_operation(name, op) {
    if (name === "vote") {
      if (op.voter === op.author) {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="danger">{"Self Vote"}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.voter} />{" "}
                </b>
                Self Voted a post <b>{op.permlink} </b>
                with <b>{op.weight / 100}%</b> Share Power
              </CardCategory>
            </CardHeader>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{name}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.voter} />{" "}
                </b>
                upvoted
                <b>
                  {" "}
                  <UserLink author={op.author} />
                </b>{" "}
                {"'s post "} <b>{op.permlink} </b>
                with <b>{op.weight / 100}%</b> Share Power
              </CardCategory>
            </CardHeader>
          </Card>
        );
      }
    } else if (name === "account_witness_vote") {
      if (op.approve) {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{name}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.account} />{" "}
                </b>{" "}
                Accepted
                <b>
                  <UserLink author={op.witness} />
                </b>
                {" as a"}
                <b> {" Witness"} </b>
              </CardCategory>
            </CardHeader>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{name}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.witness} />{" "}
                </b>{" "}
                Rejected
                <b>
                  <UserLink author={op.open_owner} />
                </b>
                {" as a"}
                <b> {" Witness"} </b>
              </CardCategory>
            </CardHeader>
          </Card>
        );
      }
    } else if (name === "fill_order") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.current_owner} />{" "}
              </b>
              Payed <b> {op.current_pays} </b> to{" "}
              <b>
                {" "}
                <UserLink author={op.open_owner} />{" "}
              </b>
              for <b> {op.open_pays} </b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "limit_order_create") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.owner} />{" "}
              </b>
              Wants to sell <b> {op.amount_to_sell} </b> for{" "}
              <b> {op.min_to_receive} </b>
              order id <b> {op.orderid} </b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "transfer_to_savings") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.from} />{" "}
              </b>
              Transferred <b> {op.amount} </b> to <b> Savings </b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "author_reward") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.author} />{" "}
              </b>
              Received <b> {op.vsd_payout} </b>|<b> {op.voilk_payout} </b>|
              <b> {op.coining_payout} </b> from Post <b>{op.permlink}</b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "comment_options") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{"Options"}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.author} />{" "}
              </b>
              posted with options
              <p>
                <b> Max payout: {op.max_accepted_payout} </b>| VSD Percentage:{" "}
                <b> {op.percent_voilk_dollars} </b>| Allow votes:{" "}
                <b> {op.allow_votes ? "YES" : "NO"} </b> |Allow C-Rewards:{" "}
                <b>{op.allow_curation_rewards ? "YES" : "NO"}</b>
              </p>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "custom_json") {
      if (op.id === "follow") {
        let follower_data = JSON.parse(op.json);
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{"Follow"}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={follower_data[1].follower} />{" "}
                </b>
                Followed{" "}
                <b>
                  {" "}
                  <UserLink author={follower_data[1].following} />{" "}
                </b>
              </CardCategory>
            </CardHeader>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{name}</Badge> ==>
                {JSON.stringify(op)}
              </CardCategory>
            </CardHeader>
          </Card>
        );
      }
    } else if (name === "comment") {
      if (op.parent_author === "") {
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{"Post"}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.author} />{" "}
                </b>
                Has Made a new Post <b> {op.permlink} </b>
              </CardCategory>
            </CardHeader>
          </Card>
        );
      } else
        return (
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{name}</Badge> ==>
                <b>
                  {" "}
                  <UserLink author={op.author} />{" "}
                </b>
                Commented on
                <b>
                  {" "}
                  <UserLink author={op.parent_author} />
                </b>{" "}
                {"'s Post "} <b>{op.permlink} </b>
              </CardCategory>
              <CardBody>
                <blockquote>
                  <p className="blockquote blockquote-info text-muted">
                    {op.body}
                    <br />
                    <br />
                    <small>
                      - <UserLink author={op.author} />
                    </small>
                  </p>
                </blockquote>
              </CardBody>
            </CardHeader>
          </Card>
        );
    } else if (name === "transfer") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{"Transfer"}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.from} />{" "}
              </b>
              Has transferred <b> {op.amount} </b>
              {" to "}
              <b>
                <UserLink author={op.to} />
              </b>{" "}
              with memo <b>{op.memo}</b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "transfer_to_coining") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.from} />{" "}
              </b>
              Vested
              <b> {op.amount}</b> to{" "}
              <b>
                <UserLink author={op.to} />{" "}
              </b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "curation_reward") {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              <b>
                {" "}
                <UserLink author={op.curator} />
              </b>{" "}
              received Curation Reward of <b> {op.reward}</b> from{" "}
              <b>
                <UserLink author={op.comment_author} />
              </b>{" "}
              {"'s Post"} <b>{op.comment_permlink}</b>
            </CardCategory>
          </CardHeader>
        </Card>
      );
    } else if (name === "request_account_recovery") {
      return null;
    } else {
      return (
        <Card>
          <CardHeader>
            <CardCategory>
              <Badge color="warning">{name}</Badge> ==>
              {JSON.stringify(op)}
            </CardCategory>
          </CardHeader>
        </Card>
      );
    }
  }

  gettransactions(name) {
    return (
      <Query
        query={gql`
                                              {
                                          history(name:"${name}", start:-1, finish: 50){
                                            detail{
                                              transaction{
                                                timestamp
                                                op
                                                {
                                                  name
                                                  opdetail
                                                }
                                              }
                                            }
                                          }
                                        }
                                   `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
          if (error) return <p>Error :(</p>;

          return data.history.reverse().map((historyitem, key) => {
            let operation = JSON.parse(
              historyitem.detail.transaction.op.opdetail
            );
            let opname = historyitem.detail.transaction.op.name;
            return <div key={key}>{this.get_operation(opname, operation)}</div>;
          });
        }}
      </Query>
    );
  }

  render() {
    let name;
    if (this.props.match.params === undefined) {
      name = "bilalhaider";
    } else {
      name = this.props.match.params.username;
    }
    return (
      <Query
        query={gql`
          {
            account(name: "${name}") {
              id
              name
              owner {
                key_auths
                weight_threshold
                account_auths
              }
              posting {
                key_auths
                weight_threshold
                account_auths
              }
              active {
                key_auths
                weight_threshold
                account_auths
              }
              memo_key
              json_metadata {
                name
                location
                about
                profile_image
                cover_image
                website
              }
              proxy
              last_owner_update
              reset_account
              created
              mined
              recovery_account
              last_account_recovery
              reset_account
              comment_count
              lifetime_vote_count
              post_count
              can_vote
              voting_manabar {
                current_mana
                last_update_time
              }
              voting_power
              balance
              savings_balance
              vsd_balance
              vsd_seconds
              vsd_seconds_last_update
              vsd_last_interest_payment
              savings_vsd_seconds_last_update
              savings_vsd_last_interest_payment
              savings_withdraw_requests
              reward_vsd_balance
              reward_voilk_balance
              reward_coining_voilk
              coining_shares
              delegated_coining_shares
              received_coining_shares
              coining_withdraw_rate
              next_coining_withdrawal
              withdrawn
              to_withdraw
              withdraw_routes
              curation_rewards
              posting_rewards
              proxied_vsf_votes
              witnesses_voted_for
              last_post
              last_root_post
              last_vote_time
              post_bandwidth
              pending_claimed_accounts
              average_bandwidth
              lifetime_bandwidth
              last_bandwidth_update
              average_market_bandwidth
              lifetime_market_bandwidth
              last_market_bandwidth_update
              coining_balance
              reputation
              witness_votes
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Loading
                header={true}
                color={"blue"}
                message={"Fetching User Data..."}
              />
            );
          if (error) return <p>Error :(</p>;
          if (data.account === null) {
            return (
              <Notification
                message={"User Not found .."}
                color={"blue"}
                header={true}
              />
            );
          }
          return (
            <React.Fragment>
              <PanelHeader size="sm" />
              <div className="content">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={4} xs={12}>
                        <Card className="card-user">
                          <div className="image">
                            <img
                              src={data.account.json_metadata.cover_image}
                              alt="..."
                            />
                          </div>
                          <CardBody>
                            <CardAuthor
                              avatar={data.account.json_metadata.profile_image}
                              avatarAlt="..."
                              title={data.account.name}
                              description={data.account.json_metadata.name}
                              link={`/@${data.account.name}`}
                            />
                            <p className="description text-center">
                              {data.account.json_metadata.about}
                            </p>
                            <p>
                              <Badge color={"primary"}>
                                {data.account.json_metadata.location}
                              </Badge>
                            </p>
                            <ProgressBar
                              color={"success"}
                              current={data.account.voting_power / 100}
                              max={"100"}
                              title={"Voting Power"}
                            />
                          </CardBody>
                        </Card>
                        <InfoBar
                          color={"primary"}
                          icon={"fas fa-funnel-dollar"}
                          info={"VSD"}
                          stats={data.account.vsd_balance}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"fas fa-coins"}
                          info={"Balance"}
                          stats={data.account.balance}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"now-ui-icons business_bank"}
                          info={"Vested"}
                          stats={data.account.coining_shares}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"now-ui-icons ui-2_chat-round"}
                          info={data.account.post_count}
                          stats={"Posts Count"}
                        />
                      </Col>
                      <Col md={8} xs={24}>
                        <div className="card ">
                          <div className="card-header ">
                            <h4 className="card-title">
                              User's information Panel -
                              <small className="description">
                                Select a Tab
                              </small>
                            </h4>
                          </div>
                          <div className="card-body ">
                            <Chitika />
                            <ul
                              className="nav nav-pills nav-pills-primary"
                              role="tablist"
                            >
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#link1"
                                  role="tablist"
                                >
                                  Info
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#link2"
                                  role="tablist"
                                >
                                  Recent History
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content tab-space">
                              <div className="tab-pane active" id="link1">
                                <Card>
                                  <CardHeader>
                                    <CardCategory>
                                      User's Information
                                    </CardCategory>
                                  </CardHeader>
                                  <CardBody>
                                    <Table>
                                      <thead className=" text-primary">
                                        <tr>
                                          <th>Property Name</th>
                                          <th className="text-left">Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {Object.keys(data.account).map(
                                          (prop, key) => {
                                            if (
                                              prop === "json_metadata" ||
                                              prop === "owner" ||
                                              prop === "active" ||
                                              prop === "posting" ||
                                              prop === "voting_manabar"
                                            ) {
                                              return null;
                                            }
                                            return (
                                              <tr key={key}>
                                                <td>{prop}</td>
                                                <td className="text-left">
                                                  <Badge color={"primary"}>
                                                    {data.account[prop]}
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
                              </div>
                              <div className="tab-pane" id="link2">
                                <Card>
                                  <CardHeader>
                                    <CardCategory>
                                      Recent Transcations
                                    </CardCategory>
                                    <CardTitle tag="h4">
                                      Recent <Badge color={"success"}>50</Badge>{" "}
                                      Transactions
                                    </CardTitle>
                                  </CardHeader>
                                  <CardBody>
                                    {this.gettransactions(data.account.name)}
                                  </CardBody>
                                </Card>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Member;
