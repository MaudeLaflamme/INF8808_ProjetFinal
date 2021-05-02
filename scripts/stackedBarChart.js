/** VIZ 3 */
import {drawLegend } from "./legend.js"

export function setXScale(margin, width, height){
  // X scale
  const widthMinusMargins = width - margin.left
  var xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, widthMinusMargins-margin.right/2])

  // X axis
  d3.select(".stackchart-group").append("g")
  .attr("class", "x axis")
  .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".0%")))
  .attr("transform", "translate(-1, " + (height - margin.top - margin.bottom) + ")")

  return xScale
}

export function setYScale(margin, height){  
  // Y scale
  const heightMinusMargins = height - margin.top - margin.bottom
  var yScale = d3.scaleBand().domain(["Page médiatique", "Page non-médiatique"]).range([margin.bottom, heightMinusMargins])

  // Y axis
  d3.select(".stackchart-group").append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale))
  .attr("transform", "translate(" + (margin.left-1) + ",0 )")

  return yScale
}

export function translateLanguages(data){
  const languagesFrench = new Intl.DisplayNames(['fr'], { type: 'language' });
  Object.keys(data["Langues"]).forEach(pageType => {
    Object.keys(data["Langues"][pageType]["relative"]).forEach(lang => {
      if(lang != "others"){
        var new_key = languagesFrench.of(lang)
        new_key = new_key.charAt(0).toUpperCase() + new_key.slice(1)
        Object.defineProperty(data["Langues"][pageType]["relative"], new_key,
          Object.getOwnPropertyDescriptor(data["Langues"][pageType]["relative"], lang));
        delete data["Langues"][pageType]["relative"][lang];
      }
      else {
        Object.defineProperty(data["Langues"][pageType]["relative"], "Autres",
          Object.getOwnPropertyDescriptor(data["Langues"][pageType]["relative"], lang));
        delete data["Langues"][pageType]["relative"][lang];
      }
    })
  })
  return data
}

export function drawButtons(json_data, color, xScale, yScale, tip){
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
  .on("click", (d) => { buttonHandler(d, json_data, color, xScale, yScale, tip) })
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

export function buttonHandler(chart_id, data, color, xScale, yScale, tip){
  drawStackedBar(data, color, chart_id, xScale, yScale, tip)
  drawLegend(color, d3.select('.legend-viz3'))
}


export function drawStackedBar(json, color, chart_id, xScale, yScale, tip) {
  var subgroups = Object.keys(json[chart_id]["Page non-médiatique"]["relative"])

  var data = Object.keys(json[chart_id]).map(page_type => {
    var item = {}
    Object.keys(json[chart_id][page_type]["relative"]).forEach(key => {
      item[key] = json[chart_id][page_type]["relative"][key];
    })
    item["category"] = page_type
    item["id"] = chart_id
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
  .attr("id", d => d.key)
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .enter().append("rect")
  .attr("x", d => xScale(d[0]))
  .attr("y", d => yScale(d.data.category))
  .attr("height", 60)
  .attr("transform", "translate(0," + 75 + ")" )
  .on("mouseover", function(d) {
    d["id"] = this.parentNode["id"];
    tip.show(d, this)
  })
  .on("mouseout", tip.hide)
  .transition()
  .duration(350)
  .attr("width", d => xScale(d[1]) - xScale(d[0]))
}
