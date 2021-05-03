import { legendColor } from 'd3-svg-legend'

export function drawLegend(colorScale, g) {
  var legendOrdinal = legendColor()
  .shape("path", d3.symbol().type(d3.symbolSquare))
  .shapeWidth(40)
  .title('Légende')
  .scale(colorScale);

  g.call(legendOrdinal);

  g.select('.legendTitle')
  .attr('font-family', 'Open Sans Condensed');

  g.selectAll('.label')
  .attr('font-size', '12px');
}
