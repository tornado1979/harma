import ReactDOM from 'react-dom'
import React from 'react'

import { Loader } from '../../components/loader'

// With HOC
const WithSize = Child => class extends React.Component {
  state = {
    height: null,
    isLoading: false,
    width: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    // add a 2sec delay until it loads the DOM
    setTimeout(() => {
      this.setSize()
      window.addEventListener('resize', this.setSize)
      this.setState({ isLoading: false })
    }, 2000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize)
  }

  setSize = () => {
    const width = ReactDOM.findDOMNode(this).clientWidth // eslint-disable-line
    const height = ReactDOM.findDOMNode(this).clientHeight // eslint-disable-line
    this.setState({ height, width })
  }

  render() {
    const { width, height, isLoading } = this.state  // eslint-disable-line

    if (isLoading) {
      return <Loader />
    }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {width && height ? <Child height={height} width={width} {...this.props} /> : null}
      </div>
    )
  }
}

export default WithSize
