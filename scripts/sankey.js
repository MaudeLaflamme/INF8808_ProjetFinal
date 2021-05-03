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

export function formatData(data,width,height){
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

    sankeys = alignSubLinks(sankeys)
 
    return sankeys
}

function alignSubLinks(data) {
    Object.keys(data).forEach(function(key) {
        if(key != 'Principal'){
            const idx = data[key].links.findIndex(obj => (obj.source.name === key && obj.target.name == 'Réactions'))

            data[key].links.forEach(element => {
                if(element.source.name == 'Réactions'){
                    element.y0 +=  data[key].links[idx].y1 - data[key].links[idx].width/2 -25
                }
            })
        }
         data[key]['columns'] = groupByColumn(data[key].nodes)
    })

    return data
}

function groupByColumn(data){
    
    const xx = (data.map(node => node.x0)).filter((v, i, a) => a.indexOf(v) === i).sort();
    const titles = [{'titre': 'Types de publication', 'x' : xx[0], 'nodes': []}, {'titre':"Type d'intéraction", "x": xx[1], 'nodes': []}, {'titre':"Type de réaction", 'x':xx[2], 'nodes': []}];
    
    data.forEach(element=>{
        titles.forEach(t=>{
            if(element.x0 == t.x){
                t.nodes.push(element)
            }
        })
    })
    return titles
}

function addColumnsTitle(data, nodeWidth){

    d3.select("#viz1-titles").append("svg")
            .attr('width', 1000)
            .attr('height', 30)
            .attr("class", "sankey-columns-title")
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", d => d.x + nodeWidth /2 +12)
            .attr("y", d => 12)
            .attr("dy", "0.35em")
            .attr("text-anchor", 'middle')
            .text(d => d.titre);
}

export function drawSelectedSankey(data, selectedNode, color, width, height) {
    const nodes =["Réactions","Partages","Commentaires","J'aime", "J'adore", "Haha", "Wouah", "Triste", "Grrr", "Solidaire"]

    drawNodes(data, data[selectedNode].nodes,color, width, height)
    drawLinks(data[selectedNode].links, color)
    addLabels(data[selectedNode].columns, width, height)
    addColumnsTitle(data[selectedNode].columns,100)

    if(selectedNode != 'Principal'){
        d3.selectAll('.link')
        .style("stroke", d => ((selectedNode != d.source.name) && (d.source.name != 'Réactions')) ? '#aaa' : color(selectedNode))
        .attr("stroke-opacity", d => ((selectedNode != d.source.name) && (d.source.name != 'Réactions')) ? '0.5' : '1')

        d3.selectAll('.node')
        .style("fill", d => nodes.includes(d.name) || selectedNode == d.name? color(d.name) : '#aaa')

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
                .attr("rx", 3).attr("ry", 3)
                .attr("fill", d => color(d.category === undefined ? d.name : d.category))
                .on("click", (d) => { focusLink(data, d.name, color, width, height) })
                .append("title")
}

function removeSankey(){
    d3.selectAll('.node').remove()
    d3.selectAll('.link').remove()
    d3.selectAll('image').remove()
    d3.selectAll('.sankeyLabel').remove()
    d3.selectAll('.sankey-columns-title').remove()

    d3.select(".viz1-svg").selectAll('text').remove()
}

function focusLink(data, selectedNode, color, width, height){
    removeSankey()
    drawSelectedSankey(data, data[selectedNode]?selectedNode:'Principal', color, width, height)
}

function addLabels(columns, width, height){
    columns.forEach(c =>{
        if(c.titre != "Type de réaction"){
            d3.select(".viz1-svg").append("g")
                .attr("class", "sankey-label")
                .selectAll("text")
                .data(c.nodes)
                .join("text")
                .attr("x", d => d.x0 + (d.x1- d.x0)/2)
                .attr("y", d => (d.y1 + d.y0) / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", 'middle')
                .text(d => d.name)
        } else {
            addIcons(c.nodes)
        }
    })
   
}


function addIcons(nodes){
    console.log(nodes)
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
            .attr("xlink:href", d => (d.value != 0)?"./icons/"+d.name+".png":"");

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