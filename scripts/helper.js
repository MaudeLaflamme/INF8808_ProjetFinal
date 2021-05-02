import * as constant from "./constants.js"

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  const containers = ['.viz1-container', '.viz2-container', '.viz3-container']
  containers.forEach(function(container) {
    d3.select(container).select('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("padding-top", "25px")
  })
}

export function setViz2_SVG(margin_left){
  d3.select(".viz2-svg").append("g")
  .attr("class", "barchart-group")
  .attr("transform", "translate(" + margin_left + ", 0)")
}

export function setViz3_SVG(margin_left){
  d3.select(".viz3-svg").append("g")
  .attr("class", "chart-group")
  .attr("transform", "translate(" + margin_left + ", 0)")
}

export function setLegendViz2(width, margin_top) {
  d3.select(".viz2-svg").append("g")
  .attr("class", "legend-viz2")
  .attr("transform", "translate(" + width + ", " + margin_top +")")
}

export function setLegendViz3(width, margin_top) {
  d3.select(".viz3-svg").append("g")
  .attr("class", "legend-viz3")
  .attr("transform", "translate(" + width + ", " + margin_top +")")
}

export function setViz3_xScale(margin, width, height){
  // X scale
  var xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width-margin.right/2])

  // X axis
  d3.select(".chart-group").append("g")
  .attr("class", "x axis")
  .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".0%")))
  .attr("transform", "translate(-1, " + height + ")")

  return xScale
}

export function setViz3_yScale(margin, height){  
  // Y scale
  var yScale = d3.scaleBand().domain(["Page médiatique", "Page non-médiatique"]).range([margin.bottom, height - margin.top])

  // Y axis
  d3.select(".chart-group").append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale))
  .attr("transform", "translate(" + (margin.left-1) + "," + margin.top + ")")

  return yScale
}

export function write_text() {
  constant.text.forEach(textInfo =>
    d3.select(textInfo.select)
    .html(textInfo.text)
  )
}