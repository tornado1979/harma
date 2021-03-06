import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  changeActivePage,
  fetchData,
} from './actionCreators'

import {
  getImmuteData,
  getItemsByPageNumber,
} from './selectors'

import './home.scss'

import { Loader } from '../../components/loader'
import { Pagination } from '../../components/pagination'

class Home extends Component {
  componentDidMount() {
    // get data from server
    const {
      getData,
    } = this.props

    getData()
  }

  // change the active page, on the central state
  changePage = (aPage) => {
    const {
      otherPage, // actionCreator
      data: {
        activePage: prevActivePage,
      },
    } = this.props

    /* eslint-disable  no-nested-ternary */
    const actPage = aPage === 'next'
      ? prevActivePage + 1
      : aPage === 'prev'
        ? prevActivePage - 1
        : aPage

    otherPage(actPage) // dispatch CHANGE_ACTIVE_PAGE
  }

  render() {
    const {
      data: {
        activePage,
        immuteData,
        items,
        itemsPerPage,
        totalPages,
      },
    } = this.props

    const articles = items && items.slice(0, itemsPerPage).map((item, idx) => {
      const to = `/info/${item.id}`
      return (
        <div className="row" key={idx}>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {item.id}
                  {item.title}
                </h5>
                <p className="card-text limit">{item.description}</p>
                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-info" type="button">
                    <Link to={to}>
                      View
                    </Link>
                  </button>
                  <a className="btn btn-primary" href="#">
                    Edit
                  </a>
                  <a className="btn btn-danger" href="#">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

    // if immuteData & items are empty, then loader
    if ((items && items.length === 0)
     && (immuteData && immuteData.length === 0)) {
      return (
        <main>
          <Loader />
        </main>
      )
    }

    return (
      <main>
        {items && items.length > 0 && articles}
        {items && items.length > 0 && (
          <Pagination
            activePage={activePage}
            handleClick={(aPage, ev) => this.changePage(aPage, ev)}
            numPages={totalPages}
          />)}
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
  getData: propTypes.func.isRequired,
  otherPage: propTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const {
    activePage,
    itemsPerPage,
  } = state.data

  return {
    data: getItemsByPageNumber({ activePage, itemsPerPage }, state),
    immuteData: getImmuteData(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getData: fetchData, // dispatch REQUEST_DATA
  otherPage: changeActivePage, // dispatch CHANGE_ACTIVE_PAGE
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
