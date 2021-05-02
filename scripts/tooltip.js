/**
* @param {object} d The data associated to the hovered element
* @returns {string} The tooltip contents
*/
export function getContents (d) {
    var avg = null
    try {
        avg = d["data"]["mean"][d["id"]]
    }
    finally {
        const lowerCaseID = (d["id"]).charAt(0).toLowerCase() + d["id"].slice(1)
        const percentage = "<span class='tooltip-value'> <u>" + d["id"] + "</u> </span><br/>" +
        "<span class='tooltip-value'>" + ((d["data"][d["id"]])*100).toFixed(1) + 
        " % des " + d["data"]["id"] + "</span>"
        const mean = "<br/><span class='tooltip-value'>" + avg + " " + lowerCaseID +
                    " par publications en moyenne. </span>"
        if(avg != null) {
            return percentage + mean
        }
        else {
            return percentage
        }
    }


}