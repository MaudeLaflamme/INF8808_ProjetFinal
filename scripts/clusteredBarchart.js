function orderPostTypes(data) {
    var subgroups = data.columns.slice(1)
    var counts = data.reduce((post_counts, line) => {
        var type = line.type
        post_counts[type] = 0
        subgroups.forEach(group => {
            post_counts[type] += parseInt(line[group])
        })
        if (type == 'others') { post_counts[type] = 0}
        return post_counts
    }, {})
    return Object.keys(counts).sort((a, b) => counts[b]-counts[a])
}


export function setXScale(data, margin, width, height) {
    var groups = orderPostTypes(data)
    console.log(groups)
    
    var xScale = d3.scaleBand()
      .domain(groups)
      .range([margin.left, width-margin.right/2])
      .padding([0.2])

    d3.select(".barchart-group").append("g")
      .attr("class", "x axis")
      .call(d3.axisBottom(xScale).tickSize(0))
      .attr("transform", "translate(-1, " + height + ")")
    
    return xScale
}

export function setSubgroupScale(data, xScale) {
    var subgroups = data.columns.slice(1)

    return d3.scaleBand()
    .domain(subgroups)
    .range([0, xScale.bandwidth()])
    .padding([0.05])
}

export function setYScale(data, margin, height) {
    var yScale = d3.scaleLinear()
    .domain([0, 5250])
    .range([height, 0])

    d3.select(".barchart-group").append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale))
    .attr("transform", "translate(" + (margin.left -1) + ", 0)")

    return yScale
}

export function drawChart(data, color, xScale, subgroupScale, yScale, height) {
    console.log(data)
    var subgroups = data.columns.slice(1)
    color.domain(subgroups)
    
    d3.select(".barchart-group").append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) {
          return "translate(" + xScale(d.type) + ",0)"; 
        })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return subgroupScale(d.key); })
      .attr("y", function(d) { return yScale(d.value); })
      .attr("width", subgroupScale.bandwidth())
      .attr("height", function(d) { return height - yScale(d.value); })
      .attr("fill", function(d) { return color(d.key); });
}