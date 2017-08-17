import React, { Component } from 'react';
import { Col, Row} from 'react-bootstrap';
import Spinner from 'react-spinkit';
import logo from '../logo.svg';
import { Link } from 'react-router';
import Dotdotdot from 'react-clamp'
import {unixConverter} from '../App'

export class WiadomosciGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { articles } = this.props.wiadomosciNews
    return (
      <div>
          <Row>
            <Col xs={12} sm={12} lg={12}>
              <div className="grid-title">Wiadomości</div>
                <Link to={`${process.env.PUBLIC_URL}/wiadomosci`}>
                  <div className="recent-news-container">
                    <span className="timestamp-news">{!articles ? '' : unixConverter(articles[0].ts)}</span>
                    {!articles ?
                      <Spinner name='double-bounce' fadeIn="quarter" color="aqua" /> :
                      <img alt="" width="100%" height="200px" src={articles[0].img === null ? logo : articles[0].img.url} />
                    }
                    <span className="recent-news-heading">{!articles ? '' : articles[0].title}</span>
                  </div>
                </Link>
            </Col>

            <Col xs={6} sm={6} lg={6}>
              {!articles ?
                <Spinner name='double-bounce' fadeIn="quarter" color="aqua" /> :
                <img alt="" className="test" width="100%" height="150px" src={articles[1].img === null ? logo : articles[1].img.url} />
              }
              <Dotdotdot className="news-title" clamp={2}>{!articles ? '' : articles[1].title}</Dotdotdot>
            </Col>

            <Col xs={6} sm={6} lg={6}>
              {!articles ?
                <Spinner name='double-bounce' fadeIn="quarter" color="aqua" /> :
                <img alt="" className="test" width="100%" height="150px" src={articles[2].img === null ? logo : articles[2].img.url} />
              }
              <Dotdotdot className="news-title" clamp={2}>{!articles ? '' : articles[2].title}</Dotdotdot>
            </Col>

            <Col xs={6} sm={6} lg={6}>
              {!articles ?
                <Spinner name='double-bounce' fadeIn="quarter" color="aqua" /> :
                <img alt="" className="test" width="100%" height="150px" src={articles[3].img === null ? logo : articles[3].img.url} />
              }
              <Dotdotdot className="news-title" clamp={2}>{!articles ? '' : articles[3].title}</Dotdotdot>
            </Col>

            <Col xs={6} sm={6} lg={6}>
              {!articles ?
                <Spinner name='double-bounce' fadeIn="quarter" color="aqua" /> :
                <img alt="" className="test" width="100%" height="150px" src={articles[4].img === null ? logo : articles[4].img.url} />
              }
              <Dotdotdot className="news-title" clamp={2}>{!articles ? '' : articles[4].title}</Dotdotdot>
            </Col>

          </Row>
      </div>
    )
  }
}
