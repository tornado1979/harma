import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'

import {
  fetchInitialData,
} from './actionCreators'

import {
  getItems,
} from './selectors'

import './home.scss'

class Home extends Component {
  componentDidMount() {
    // get data from server
    const {
      getData,
    } = this.props

    getData()
  }

  render() {
    const {
      data: {
        items,
      },
    } = this.props

    const articles = items.slice(0, 5).map((item, idx) => {
      return (
        <div className="row" key={idx}>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text limit">{item.description}</p>
                <div style={{ textAlign: 'right' }}>
                  <a className="btn btn-primary" href="#">View</a>
                  <a className="btn btn-info" href="#">Edit</a>
                  <a className="btn btn-danger" href="#">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    const pagination = (
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item active"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    )

    return (
      <main>
        {items.length > 0 && articles}
        {items.length > 0 && pagination}
      </main>
    )
  }
}

Home.propTypes = {
  data: propTypes.shape({
    activePage: 0,
    error: '',
    isFetching: false,
    items: [],
    totalPages: 0,
  }).isRequired,
  getData: propTypes.func.isRequired, // eslint-disable-line
}

const mapStateToProps = (state) => {
  return {
    data: getItems(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getData: fetchInitialData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
