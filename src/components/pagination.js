import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

export const Pagination = ({ numPages, activePage, handleClick }) => {
  function buildEdgeButtons() {
    // build prev button
    // disable 'next' & 'prev' buttons when active page is on edge
    const isFirstPage = activePage === 1
    const isLastPage = numPages === activePage

    const styleNext = classnames({
      active: !isLastPage,
      disabled: isLastPage,
      'page-item': true,
    })
    const stylePrev = classnames({
      active: !isFirstPage,
      disabled: isFirstPage,
      'page-item': true,
    })

    let prev
    let next
    if (isFirstPage) {
      prev = <span className="page-link">Previous</span>
      next = <a className="page-link" href="#" onClick={() => handleClick('next')}>Next</a>
    } else if (isLastPage) {
      prev = <a className="page-link" href="#" onClick={() => handleClick('prev')}>Previous</a>
      next = <span className="page-link">Next</span>
    } else {
      prev = <a className="page-link" href="#" onClick={() => handleClick('prev')}>Previous</a>
      next = <a className="page-link" href="#" onClick={() => handleClick('next')}>Next</a>
    }

    return {
      next,
      prev,
      styleNext,
      stylePrev,
    }
  }

  function buildPagination() {
    const pages = []
    // build the numbers of the pagination bar
    for (let i = 1; i <= numPages; i += 1) {
      let style = classnames({ //eslint-disable-line
        active: activePage === i,
        'page-item': true,
      })
      pages.push(<li className={style} key={i}><a className="page-link" href="#" onClick={() => handleClick(i)}>{i}</a></li>)
    }
    return pages
  }

  const pages = buildPagination()
  const edgeButtons = buildEdgeButtons()

  return (
    <nav aria-label="navigation for items">
      <ul className="pagination">
        <li className={edgeButtons.stylePrev}>{edgeButtons.prev}</li>
        {pages}
        <li className={edgeButtons.styleNext}>{edgeButtons.next}</li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  activePage: propTypes.number.isRequired,
  handleClick: propTypes.func.isRequired,
  numPages: propTypes.number.isRequired,
}
