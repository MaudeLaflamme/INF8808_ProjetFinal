/**
* @param {object} d The data associated to the hovered element
* @returns {string} The tooltip contents
*/
export function getContents (d) {
    return "<span class='tooltip-value'> <u>" + d["id"] + "</u> </span><br>" +
    "<span class='tooltip-value'>" + ((d[1] - d[0])*100).toFixed(1) + 
    " % des " + d["data"]["id"] + "</span>"

}