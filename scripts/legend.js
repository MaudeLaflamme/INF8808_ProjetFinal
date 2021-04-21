import { legendColor } from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
   
  var legendOrdinal = legendColor()
  .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
  .title('Légende')
  .scale(colorScale);

  g.call(legendOrdinal);

  g.select('.legendTitle')
  .attr('font-family', 'Open Sans Condensed');

  g.selectAll('.label')
  .attr('font-size', '12px');
}
