'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as clustered from './scripts/clusteredBarchart.js'
import * as sankey from './scripts/sankey.js'
import * as legend from './scripts/legend.js'
import * as panel from './scripts/panel.js'
import * as constants from './scripts/constants.js'

/**
 * @file This file is the entry-point for the code for the final project of the course INF8808.
 * @author Maude Laflamme, Maude Nguyen-The, Elisabeth Fagnan
 * @version v1.0.0
 */

(function (d3) {

  helper.setCanvasSize(constants.svgSize.width, constants.svgSize.height)
  build()

  /**
   *   This function builds the graph.
   */
  function build () {
    // VIZ 1
    var colorSankey = d3.scaleOrdinal(constants.colorScheme)
    sankey.draw_sankey(colorSankey)

    //VIZ 2
    const viz2_height = constants.svgSize.height - constants.margin.bottom
    var colorClustered = d3.scaleOrdinal(constants.colorScheme)
    helper.setViz2_SVG(constants.margin.left)
    helper.setLegendViz2(constants.width, constants.margin.top)
    d3.csv('./clustered_barchart.csv').then(function(data) {
      var v2_xScale = clustered.setXScale(data, constants.margin, constants.width, viz2_height)
      var v2_yScale = clustered.setYScale(data, constants.margin, viz2_height)
      var scaleSubgroups = clustered.setSubgroupScale(data, v2_xScale)
      clustered.drawChart(data, colorClustered, v2_xScale, scaleSubgroups, v2_yScale, viz2_height)
      legend.drawLegend(colorClustered, d3.select('.legend-viz2'))
    })

    // VIZ 3
    const viz3_height = constants.svgSize.height - 125 - constants.margin.bottom - constants.margin.top
    const viz3_width = constants.svgSize.width - constants.margin.left - constants.margin.right
    var colorStacked = d3.scaleOrdinal(constants.colorScheme)
    helper.setViz3_SVG(constants.margin.left, constants.margin.top)
    helper.setLegendViz3(viz3_width, constants.margin.top)
    var v3_xScale = helper.setViz3_xScale(constants.margin, viz3_width, viz3_height)
    var v3_yScale = helper.setViz3_yScale(constants.margin, viz3_height)
    d3.json('./stacked_barchart.json').then(function (data) {
      viz.drawButtons(data, colorStacked, v3_xScale, v3_yScale)
      viz.drawStackedBar(data, colorStacked, "Intéractions", v3_xScale, v3_yScale)
      legend.drawLegend(colorStacked, d3.select('.legend-viz3'))
    })    
    helper.write_text()
  }
})(d3)
