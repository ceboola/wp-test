import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import logo from './logo.svg';
import './App.css';
import { gql, graphql } from 'react-apollo';
import { compose } from 'react-apollo';
import { Grid, Col, Row} from 'react-bootstrap';
import { WiadomosciGrid, TechGrid, GwiazdyGrid } from './components';
import { Link } from 'react-router';

export const unixConverter = (UNIX_timestamp) => {
    const convertDate = new Date(UNIX_timestamp * 1000);
    const months = ['.01.','.02.','.03.','.04.','.05.','.06.','.07.','.08.','.09.','.10.','.11.','.12.'];
    const year = convertDate.getFullYear();
    const month = months[convertDate.getMonth()];
    const date = convertDate.getDate();
    //let hour = convertDate.getHours();
    //let min = convertDate.getMinutes();
    //let sec = convertDate.getSeconds();
    return [year, month, date]
  }

class App extends Component {
  /*
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
    console.log(this.state.isLoading)
  }

  componentDidMount() {
    setTimeout(() => {
            this.setState({
                isLoading: true
            });
            console.log(this.state.isLoading)
        }, 5000)
  }
  */

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* !this.state.isLoading ? 'hi' : this.props.client.queryManager.observableQueries[1].observableQuery.lastResult.data.articles["0"].title */}
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h3>wp-test</h3>
        </div>

      <Grid>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <WiadomosciGrid {...this.props} />
          </Col>

          <Col xs={12} md={4} lg={4}>
            <TechGrid {...this.props} />
          </Col>


          <Col xs={12} md={4} lg={4}>
            <GwiazdyGrid {...this.props} />
          </Col>
        </Row>
    </Grid>
    </div>
    );
  }
}

const queries = {

  wiadomosciNews: gql`
  {
    articles(t: [Article], limit: 5, service: [Wiadomosci]) {
      body(t: [Plain]) {
        data
        t
      }
      img {
        url
      }
      title
      ts
    }
  }
  `,
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
      ts
    }
  }
  `,
  gwiazdyNews: gql`
  {
    articles(t: [Article], limit: 5, service: [Gwiazdy]) {
      body(t: [Plain]) {
        data
        t
      }
      img {
        url
      }
      title
      ts
    }
  }
  `,
};

const AppData = compose(
   graphql(queries.techNews, {
      name: "techNews",
      options: {
      fetchPolicy: 'cache-and-network',
      pollInterval: 120000 }
   }),
   graphql(queries.gwiazdyNews, {
      name: "gwiazdyNews",
      options: {
      fetchPolicy: 'cache-and-network',
      pollInterval: 120000 }
   }),
   graphql(queries.wiadomosciNews, {
      name: "wiadomosciNews",
      options: {
      fetchPolicy: 'cache-and-network',
      pollInterval: 120000 }
   }),
)(App);

export default AppData
