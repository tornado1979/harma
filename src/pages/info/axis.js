import React from 'react'
import * as d3 from 'd3'
import propTypes from 'prop-types'
import './bar-chart.scss'

export default class HorisontalBarChart extends React.Component {
  static displayName = 'Axis'

  constructor(props) {
    super(props)
    this.axisXRef = React.createRef()
    this.axisYRef = React.createRef()
  }

  componentDidMount() {
    this.createXAxis()
    this.createYAxis()
  }

  componentDidUpdate() {
    this.createXAxis()
    this.createYAxis()
  }

  createXAxis() {
    const {
      scaleX,
      scaleY,
    } = this.props

    const xAxis = d3
      .axisTop(scaleX)
      .tickSize(scaleY.range()[0])
      .tickFormat(d => d)

    d3.select(this.axisXRef.current).call(g => {
      g.call(xAxis)
      g.selectAll('.tick text')
        .attr('y', 20)
        .classed('chart-axis__label', true)
        .classed('chart-axis__label--x', true)
        // values > 546 get yellow class
        .classed('axisYellow', (d) => {
          return d > 546
        })

      g.selectAll('.tick line')
        .attr('y1', 5)
        .classed('chart-axis__axis', true)
        // line gets yellow
        .classed('axisYellow', (d) => {
          return d > 545
        })

      g.selectAll('.domain').classed('chart-axis__axis', true)
    })
  }

  createYAxis() {
    const {
      scaleX,
      scaleY,
    } = this.props

    const yAxis = d3
      .axisRight(scaleY)
      .tickSize(scaleX.range()[1])

    d3.select(this.axisYRef.current).call(g => {
      g.call(yAxis)
      g.selectAll('.tick line')
        .attr('x1', 0)
        .classed('chart-axis__axis', true)

      g.selectAll('.tick text')
        .attr('x', -50)
        .classed('chart-axis__label', true)

      g.selectAll('.domain').classed('chart-axis__axis', true)
    })
  }

  render() {
    const { scaleY } = this.props

    return (
      <g className="axis">
        <g ref={this.axisXRef} transform={`translate(0, ${scaleY.range()[0]})`} />
        <g ref={this.axisYRef} />
      </g>
    )
  }
}

HorisontalBarChart.propTypes = {
  scaleX: propTypes.func.isRequired,
  scaleY: propTypes.func.isRequired,
}
