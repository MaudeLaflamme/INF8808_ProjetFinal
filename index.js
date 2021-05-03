'use strict'

import * as helper from './scripts/helper.js'
import * as stacked from './scripts/stackedBarchart.js'
import * as clustered from './scripts/clusteredBarchart.js'
import * as sankey from './scripts/sankey.js'
import * as legend from './scripts/legend.js'
import * as constants from './scripts/constants.js'
import * as tooltip from './scripts/tooltip.js'

import d3Tip from 'd3-tip'
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
    d3.csv('./data_sankey.csv').then(function (data) {
      data = sankey.formatData(data, (constants.svgSize.width - 40), constants.svgSize.height)
      sankey.drawSelectedSankey(data, 'Principal', colorSankey, constants.svgSize.width, constants.svgSize.height)
      
    })

    //VIZ 2
    var colorClustered = d3.scaleOrdinal(constants.colorScheme)
    clustered.setSVG(constants.margin.left)
    clustered.setLegend(constants.width, constants.margin.top)

    d3.csv('./clustered_barchart.csv').then(function(data) {
      var v2_xScale = clustered.setXScale(data, constants.margin, constants.width, constants.svgSize.height)
      var v2_yScale = clustered.setYScale(data, constants.margin, constants.svgSize.height)
      var scaleSubgroups = clustered.setSubgroupScale(data, v2_xScale)
      clustered.drawChart(data, colorClustered, v2_xScale, scaleSubgroups, v2_yScale, constants.svgSize.height, constants.margin)
      legend.drawLegend(colorClustered, d3.select('.legend-viz2'))
    })

    // VIZ 3
    var colorStacked = d3.scaleOrdinal(constants.colorScheme)
    
    const tip_v3 = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
    d3.select('.viz3-svg').call(tip_v3)

    stacked.setSVG(constants.margin.left, constants.margin.top)
    stacked.setLegend(constants.width, constants.margin)
    var v3_xScale = stacked.setXScale(constants.margin, constants.width, constants.stackedHeight)
    var v3_yScale = stacked.setYScale(constants.margin, constants.stackedHeight)
    d3.json('./stacked_barchart.json').then(function (data) {
      data = stacked.translateLanguages(data)
      stacked.drawButtons(data, colorStacked, v3_xScale, v3_yScale, tip_v3)
      stacked.drawStackedBar(data, colorStacked, "Intéractions", v3_xScale, v3_yScale, tip_v3)
      legend.drawLegend(colorStacked, d3.select('.legend-viz3'))
    })    
    helper.write_text()
  }
})(d3)
