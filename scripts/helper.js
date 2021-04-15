
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('.viz-container').select('svg')
    .attr('width', width)
    .attr('height', height)
}

export function setViz3_SVG(margin_left){
  d3.select(".viz3-svg").append("g")
  .attr("class", "chart-group")
  .attr("transform", "translate(" + margin_left + ", 0)")
}

export function setViz3_xScale(margin, width, height){
  // X scale
  var xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width])

  // X axis
  d3.select(".chart-group").append("g")
  .attr("class", "x axis")
  .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".0%")))
  .attr("transform", "translate(-1, " + height + ")")

  return xScale
}

export function setViz3_yScale(margin, height){  
  // Y scale
  var yScale = d3.scaleBand().domain(["media", "non-media"]).range([margin.bottom, height - margin.top])

  // Y axis
  d3.select(".chart-group").append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale))
  .attr("transform", "translate(" + (margin.left -1) + "," + margin.top + ")")

  return yScale
}