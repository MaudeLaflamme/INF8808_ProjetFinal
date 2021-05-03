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


export function write_text() {
  constant.text.forEach(textInfo =>
    d3.select(textInfo.select)
    .html(textInfo.text)
  )
}