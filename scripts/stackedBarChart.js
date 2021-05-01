/** VIZ 3 */
import { drawLegend } from "./legend.js"

export function drawButtons(json_data, color, xScale, yScale){
  d3.select(".viz3-svg").append("g")
  .attr("class", "buttons-container")
  .attr("transform", "translate(120, 10)")

  d3.select(".buttons-container").selectAll("g")
  .data(Object.keys(json_data))
  .enter()
  .append("g")
  .attr("class", "button")
  .attr("width", 100)
  .attr("height", 30)
  .attr("transform", (d, i) => {
    return "translate(" + i*110 + ",0)"
  })
  .on("click", (d) => { buttonHandler(d, json_data, color, xScale, yScale) })
  .append("rect")
  .attr("width", 100)
  .attr("height", 30)
  .attr("fill", d => d == 'interactions'? "#A5A5A5" : "#E0E0E0")
  .on("mouseenter", function () {
    d3.select(this).attr("stroke", "#362023")
  })
  .on("mouseleave", function () {
    d3.select(this).attr("stroke", "#E0E0E0")
  })
  .on("click", function () {
    d3.select(this.parentNode.parentNode).selectAll("rect").attr("fill", "#E0E0E0")
    d3.select(this).attr("fill", "#A5A5A5")
  })

  d3.select(".buttons-container").selectAll("text")
  .data(Object.keys(json_data))
  .enter()
  .append("text")
  .attr("x", (d,i) => {
    return i*110
  })
  .attr("y", 15)
  .attr("transform", "translate(50,0)")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .attr("class", "button-text")
  .text(d => d)
  .attr("font-size", "10px")
  .attr("fill", "#0000000")
}

export function buttonHandler(chart_id, data, color, xScale, yScale){
  drawStackedBar(data, color, chart_id, xScale, yScale)
  drawLegend(color, d3.select('.legend-viz3'))
}


export function drawStackedBar(json, color, chart_id, xScale, yScale) {
  var subgroups = Object.keys(json[chart_id]["Page non-médiatique"]["relative"])

  var data = Object.keys(json[chart_id]).map(page_type => {
    var item = {}
    Object.keys(json[chart_id][page_type]["relative"]).forEach(key => {
      item[key] = json[chart_id][page_type]["relative"][key]
    })
    item["category"] = page_type
    if("mean" in json[chart_id][page_type]) {
      item["mean"] = json[chart_id][page_type]["mean"]
    }
    return item
  }, [])

  // Color
  color.domain(subgroups)

  // Stacked bar
  var stackedData = d3.stack().keys(subgroups).order(d3.stackOrderDescending)(data)

  d3.select(".stackchart-group").append("g")
  .selectAll("g")
  .data(stackedData)
  .enter().append("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .enter().append("rect")
  .attr("x", d => xScale(d[0]))
  .attr("y", d => yScale(d.data.category))
  .attr("height", 60)
  .attr("transform", "translate(0," + 75 + ")" )
  .transition()
  .duration(350)
  .attr("width", d => xScale(d[1]) - xScale(d[0]))
}
