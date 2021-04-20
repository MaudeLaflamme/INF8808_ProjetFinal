'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
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
    var color = d3.scaleOrdinal(constants.colorScheme)
    sankey.draw_sankey(color)
    var data = require('./assets/data/stacked_barchart.json')
    helper.setViz3_SVG(constants.margin.left)
    helper.write_text()
    var v3_xScale = helper.setViz3_xScale(constants.margin, constants.width, constants.height)
    var v3_yScale = helper.setViz3_yScale(constants.margin, constants.height)
    viz.drawButtons(data, color, v3_xScale, v3_yScale)
    viz.drawStackedBar(data, color, "interactions", v3_xScale, v3_yScale)

  }
})(d3)
