function computeSankey(sankeyWidth,height){
    const sankey = d3.sankey()
      .nodeId(d => d.name)
      .nodeAlign(d3.sankeyCenter)
      .nodeWidth(100)
      .nodePadding(20)
      .extent([[1, 5], [sankeyWidth - 1, height - 5]]);

    return ({nodes, links}) => sankey({
        nodes: nodes.map(d => Object.assign({}, d)),
        links: links.map(d => Object.assign({}, d))
    });
}

function formatData(data,width,height){
    const data_sankeys = data.reduce(function (allLinks, element){
        const link = {'source': element.source, 'target': element.target, 'value': element.value}
        if (!(element.diagram in allLinks)) {
            allLinks[element.diagram] = {'nodes':[], 'links':[]}
        }
        
        
        allLinks[element.diagram].links.push(link)
        return allLinks
    }, {})

    const sankey = computeSankey(width,height)
    let sankeys= []
    Object.keys(data_sankeys).forEach(function(key) {
        if(key != 'Principal'){
            data_sankeys.Principal.links.forEach(function(item){
                if(item.source != 'Réactions'){
                    data_sankeys[key].links.push(item)
                }
            });

        }
        data_sankeys[key].nodes = Array.from(new Set(data_sankeys[key].links.flatMap(l => [l.source, l.target])), name => ({name, category: name.replace(/ .*/, "")}))
        
        
        const nodes = data_sankeys[key].nodes
        const links = data_sankeys[key].links
        
        const s = {nodes,links}
        
        sankeys[key] = sankey(s)
    })

 
    return sankeys
}


function drawSelectedSankey(data, selectedNode, color, width, height) {
    drawNodes(data, data[selectedNode].nodes,color, width, height)
    drawLinks(data[selectedNode].links, color)
    addLabels(data[selectedNode].nodes, width, height)

    if(selectedNode != 'Principal'){
        d3.selectAll('.link')
        .style("stroke", d => ((selectedNode != d.source.name) && (d.source.name != 'Réactions')) ? '#aaa' : color(selectedNode))
        .attr("stroke-opacity", d => ((selectedNode != d.source.name) && (d.source.name != 'Réactions')) ? '0.5' : '1')

    }
        
}

function drawNodes(data, nodes, color, width, height){
    d3.select(".viz1-svg").append("g")
                .attr("stroke", "#000")
                .selectAll("rect")
                .data(nodes)
                .join("rect")
                .attr("class", "node")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("rx", 5).attr("ry", 5)
                .attr("fill", d => color(d.category === undefined ? d.name : d.category))
                .on("click", (d) => { focusLink(data, d.name, color, width, height) })
                .append("title")
}

function removeSankey(){
    d3.selectAll('.node').remove()
    d3.selectAll('.link').remove()
    d3.selectAll('image').remove()
    d3.selectAll('.sankeyLabel').remove()
    d3.select(".viz1-svg").selectAll('text').remove()
}

function focusLink(data, selectedNode, color, width, height){
    removeSankey()
    drawSelectedSankey(data, data[selectedNode]?selectedNode:'Principal', color, )
}

function addLabels(nodes, width, height){
    const react = ["likes", "Love", "Haha", "Wow", "Triste", "Colere", "Solid"]
    d3.select(".viz1-svg").append("g")
            .attr("class", "sankey-label")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => d.x0 + (d.x1- d.x0)/2)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", 'middle')
            .text(d => react.includes(d.name)? "": d.name);
    
    addIcons(nodes,width,height)
}


function addIcons(nodes, width, height){
    const react = ["likes", "Love", "Haha", "Wow", "Triste", "Colere", "Solid"]
    d3.select(".viz1-svg").append("g")
            .attr("class", "sankey-label")
            .selectAll("text")
            .data(nodes)
            .join("image")
            .attr("x", d => d.x1 + 6)
            .attr("y", d => ((d.y1 + d.y0) / 2) - 12 )
            .attr('width', 20)
            .attr('height', 24)
            .attr("text-anchor", "middle")
            .attr("xlink:href", d => react.includes(d.name)?"./icons/"+d.name+".png":"");

}

function drawLinks(links,color){
    const link = d3.select(".viz1-svg").append("g")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.5)
                .selectAll("g")
                .data(links)
                .join("g")
                .style("mix-blend-mode", "multiply");
      
      
    link.append("path")
        .attr("class", "link")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => color(d.source.category === undefined ? d.source.name : d.source.category))
        .attr("stroke-width", d => Math.max(1, d.width))
        .transition()
        .duration(350);
      
    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}`);
}


export function draw_sankey(color){ 
        const width = 930
        const height = 625
        d3.csv('./data_sankey.csv').then(function (data) {
            
            data = formatData(data,width,height)
            
            drawSelectedSankey(data, 'Principal', color, width, height)
            
        })

}