import React from 'react'
import * as d3 from 'd3'
import propTypes from 'prop-types'

import { generateArray } from './array-processors'
import WithSize from './with-size'
import Axis from './axis'
import './bar-chart.scss'

const OFFSETS = {
  top: 50,
  bottom: 50,
  left: 100,
  right: 50,
}

class HorisontalBarChart extends React.Component {
  static displayName = 'HorisontalBarChart'

  state = {
    data: generateArray(this.props.data), // eslint-disable-line
  }

  componentWillMount() {
    this.setState({
      scaleX: this.createScaleX(),
      scaleY: this.createScaleY(),
    })
  }

  componentDidUpdate(prevProps) {
    const {
      height,
      width,
    } = this.props

    if (prevProps.width !== width || prevProps.height !== height) {
      this.setState({ // eslint-disable-line
        scaleX: this.createScaleX(),
        scaleY: this.createScaleY(),
      })
    }
  }

  createScaleX() {
    const {
      data,
    } = this.state
    const {
      width,
    } = this.props

    let minX = d3.min(data, x => x.val)
    // Add nevative support
    minX = minX > 0 ? 0 : minX
    return d3
      .scaleLinear()
      .domain([minX, d3.max(data, x => x.val) + 10])
      .rangeRound([0, width - OFFSETS.left - OFFSETS.right])
  }

  createScaleY() {
    const {
      data,
    } = this.state
    const {
      height,
    } = this.props

    return d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([height - OFFSETS.top - OFFSETS.bottom, 0])
      .padding(0.2)
  }

  renderBars() {
    const { scaleX, scaleY, data } = this.state
    return data.map(d => {
      // change color on the bars > 546
      const barColor = d.val > 546 ? 'yellow' : 'steelblue'
      return (
        <g key={`key_${d.label}`} transform={`translate(0, ${scaleY(d.label)})`}>
          <rect fill={barColor} height={scaleY.bandwidth()} width={scaleX(d.val)} />
        </g>
      )
    })
  }

  render() {
    const { data, scaleX, scaleY } = this.state

    const { width, height } = this.props

    if (!data || !scaleX || !scaleY) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <svg className="bar-chart" height={height} width={width}>
          <g transform={`translate(${OFFSETS.left}, ${OFFSETS.top})`}>
            <g>
              <Axis scaleX={scaleX} scaleY={scaleY} />
            </g>
            <g>{this.renderBars()}</g>
          </g>
        </svg>
      </div>
    )
  }
}

HorisontalBarChart.propTypes = {
  height: propTypes.number.isRequired,
  width: propTypes.number.isRequired,
}

export default WithSize(HorisontalBarChart)
