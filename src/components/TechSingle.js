import React, { Component } from 'react';
import {Rehydrate} from './Rehydrated'
import { compose } from 'react-apollo';
import { gql, graphql } from 'react-apollo';
import logo from '../logo.svg';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router';

class Tech extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { articles } = this.props.techNews
    return (
    <Rehydrate>
      <div className="App-header">
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h3>wp-test</h3>
      </div>
      <div className="fadein">
        <div className="image-singlenews-container">
          <Image responsive={true} rounded={true} src={!articles ? logo : articles[0].img.url} />
          <span className="singlenews-heading">{!articles ? '' : articles[0].title}</span>
        </div>
        {!articles ? '' : articles[0].body["0"].data}
      </div>
    </Rehydrate>
    )
  }
}

const queries = {

  techNews: gql`
  {
    articles(t: [Article], limit: 5, service: [Tech]) {
      body(t: [Plain]) {
        data
        t
      }
      img {
        url
      }
      title
      cid
    }
  }
  `,
};

const TechSingle = compose(
   graphql(queries.techNews, {
      name: "techNews",
      options: {
      fetchPolicy: 'cache-and-network',
      pollInterval: 120000 }
   }),
)(Tech);

export default TechSingle
