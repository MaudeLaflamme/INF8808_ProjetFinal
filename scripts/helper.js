
/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('.viz1-container').select('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("padding-top", "25px")
  d3.select('.viz2-container').select('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("padding-top", "25px")
  d3.select('.viz3-container').select('svg')
    .attr('width', width)
    .attr('height', height-125)
    .attr("padding-top", "25px")
}

export function setViz2_SVG(margin_left){
  d3.select(".viz2-svg").append("g")
  .attr("class", "barchart-group")
  .attr("transform", "translate(" + margin_left + ", 0)")
}

export function setViz3_SVG(margin_left, margin_top){
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

export function write_text(){
  const viz1_container = d3.select(".viz1-container")
  .insert("div", ":first-child")
  .attr("class", "title-text")
  .append("text")
  .text("TITRE VIZ 1")

  viz1_container
  .insert("div", ":first-child")
  .attr("class", "text-class")
  .append("text")
  .text("Ce paragraphe introduira brièvement la visualisation ci-bas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
  
  const viz2_container = d3.select(".viz2-container")
  .insert("div", ":first-child")
  .attr("class", "title-text")
  .append("text")
  .text("TITRE VIZ 2")

  viz2_container
  .insert("div", ":first-child")
  .attr("class", "text-class")
  .append("text")
  .text("Ce paragraphe introduira brièvement la visualisation ci-bas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

  const viz3_container = d3.select(".viz3-container")
  .insert("div", ":first-child")
  .attr("class", "title-text")
  .append("text")
  .text("TITRE VIZ 3")

  viz3_container
  .insert("div", ":first-child")
  .attr("class", "text-class")
  .append("text")
  .text("Ce paragraphe introduira brièvement la visualisation ci-bas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
}