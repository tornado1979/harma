import ReactDOM from 'react-dom'
import React from 'react'

import { Loader } from '../../components/loader'

// With HOC
const WithSize = Child => class extends React.Component {
  state = {
    width: null,
    height: null,
    isLoading: false,
  }

  constructor(props) {
    super(props)
    this.setSize = this.setSize.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })

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
    this.setState({ width, height })
  }

  render() {
    const { width, height, isLoading } = this.state  // eslint-disable-line

    if (isLoading) {
      return <Loader />
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {width && height ? <Child width={width} height={height} {...this.props} /> : null}
      </div>
    )
  }
}

export default WithSize
