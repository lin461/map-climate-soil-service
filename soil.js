
function soil_post(position) {
    // Create our XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Create some variables we need to send to 
    var url = "http://csip.engr.colostate.edu:8083/csip-erosion/d/soils/1.2";

    var data = JSON.stringify({
        "metainfo": {},
        "parameter": [{
            "name": "AoI",
            "value": {
                "type": "FeatureCollection",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:EPSG:7.9.8:4326"
                    }
                },
                "features": [position]
            }
        }]
    });

    xhr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    xhr.setRequestHeader("Content-type", "application/json");

    // Access the onreadystatechange event for the XMLHttpRequest object
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var return_data = xhr.responseText;
                document.getElementById("status").innerHTML = return_data;
                //alert(return_data);
            }
        }
    // Send the data now... and wait for response to update the status div
    xhr.send(data); // Actually execute the request
    document.getElementById("status").innerHTML = "processing...";

}