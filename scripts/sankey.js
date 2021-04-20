function computeSankey(sankeyWidth,height){
    const sankey = d3.sankey()
      .nodeId(d => d.name)
      .nodeAlign(d3.sankeyCenter)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [sankeyWidth - 1, height - 5]]);

    return ({nodes, links}) => sankey({
        nodes: nodes.map(d => Object.assign({}, d)),
        links: links.map(d => Object.assign({}, d))
    });
}

function formatData(data){
    const links = data
    const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), name => ({name, category: name.replace(/ .*/, "")}));
    
    return {nodes, links}
}

function drawNodes(nodes, color){
    d3.select(".viz3-svg").append("g")
                .attr("stroke", "#000")
                .selectAll("rect")
                .data(nodes)
                .join("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("fill", d => color(d.category === undefined ? d.name : d.category))
                .append("title")
    
    
}

function addLabels(nodes, width, height){
    d3.select(".viz3-svg").append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
            .text(d => d.name);
        
}

function drawLinks(links){
    const link = d3.select(".viz3-svg").append("g")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.5)
                .selectAll("g")
                .data(links)
                .join("g")
                .style("mix-blend-mode", "multiply");
      
      
    link.append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => "#aaa")
        .attr("stroke-width", d => Math.max(1, d.width));
      
    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}`);
}


export function draw_sankey(){ //(json, color, chart_id, xScale, yScale) {

        const width = 960
        const height = 625
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        
    
        d3.csv('./data_sankey.csv').then(function (data) {
            
            data = formatData(data)
            // const svg = d3.select(".viz3-svg").append("svg")
            // .attr("viewBox", [0, 0, width, height]);

            const sankey = computeSankey(width,height)
            
            const s = sankey(data)
            
            drawNodes(s.nodes, color)
            drawLinks(s.links)
            addLabels(s.nodes, width, height)
        
        })

}