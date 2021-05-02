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
    if(container != ".viz3-container"){
      d3.select(container).select('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("padding-top", "25px")
    }
    else {
      d3.select(container).select('svg')
      .attr('width', width)
      .attr('height', height-125)
      .attr("padding-top", "25px")
    }
  })
}

export function setViz2_SVG(margin_left){
  d3.select(".viz2-svg").append("g")
  .attr("class", "barchart-group")
  .attr("transform", "translate(" + margin_left + ", 0)")
}

export function setViz3_SVG(margin_top){
  d3.select(".viz3-svg").append("g")
  .attr("class", "stackchart-group")
  .attr("transform", "translate(75," + margin_top + ")")
}

export function setLegendViz2(width, margin_top) {
  d3.select(".viz2-svg").append("g")
  .attr("class", "legend-viz2")
  .attr("transform", "translate(" + width + ", " + margin_top +")")
}

export function setLegendViz3(width, margin) {
  d3.select(".viz3-svg").append("g")
  .attr("class", "legend-viz3")
  .attr("transform", "translate(" + (width - margin.left +20) + ", " + margin.top +")")
}

export function write_text() {
  constant.text.forEach(textInfo =>
    d3.select(textInfo.select)
    .html(textInfo.text)
  )
}