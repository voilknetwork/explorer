import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Badge, CardHeader, CardBody } from "reactstrap";
import { CardCategory } from "components";
import UserLink from "../Member/UserLink";
class Transaction extends Component {
  get_operation(operation) {
    let name = operation[0];
    let op = operation[1];
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

console.log(op.json)
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
  render() {
    let ndata = this.props.data;
    return (
      <React.Fragment>
        {ndata.transactions_count !== 0
          ? ndata.transactions.map((tx, key) => {
              console.log(tx.operations);
              return tx.operations.map((op, key) => {
                let operation = JSON.parse(op);
                return <div key={key}>{this.get_operation(operation)}</div>;
              });
            })
          : null}
      </React.Fragment>
    );
  }
}

Transaction.propTypes = {
  data: PropTypes.string
};

export default Transaction;
