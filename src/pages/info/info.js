import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getItemById } from '../home/selectors'

import './info.scss'
import HorisontalBarChart from './horizontal'

class Info extends Component {
  state = {
    itemInfo: {},
  }

  componentDidMount() {
    const {
      itemDetails,
    } = this.props

    this.setState({
      itemInfo: itemDetails,
    })
  }

  render() {
    const {
      itemInfo,
    } = this.state

    // if item has no data, i show a message to the user
    if (!itemInfo) {
      return (
        <p>
          Sorry, there might have happened two things here:
          <ul>
            <li>
              Pressed (f5), and the state is empty.
            </li>
            <li>
              wrong itemId on the URL.
            </li>
          </ul>

          <Link to="/">
            In any case Go back.
          </Link>
        </p>
      )
    }

    return (
      <main>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-success" onClick={this.pageByNumber} type="button">
                    <Link to="/">
                      Back
                    </Link>
                  </button>
                </div>
                <h5 className="card-title">
                  {itemInfo.id}
                  {itemInfo.title}
                </h5>
                <p className="card-text">{itemInfo.description}</p>
                <div className="image-chart-container">
                  <div className="card-image">
                    <img alt="item" src={itemInfo.thumbnailUrl} />
                  </div>
                  <div className="card-chart">
                    <div style={{ textAlign: 'center' }}>Horizontal bar chart - Target: 546</div>
                    <HorisontalBarChart
                      data={itemInfo.data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

Info.propTypes = {
  itemDetails: propTypes.shape().isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id
  return {
    itemDetails: getItemById(itemId, state),
    itemId,
  }
}

export default connect(mapStateToProps, null)(Info)
