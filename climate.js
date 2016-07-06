
function climate_post(lat, lng) {
    // Create our XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Create some variables we need to send to
    var url = "http://csip.engr.colostate.edu:8081/csip/d/rusle2/climate/1.0";

    var data = JSON.stringify({
        "metainfo": {
            "mode": "sync",
            "keep_results": "3600000"
        },
        "parameter": [{
            "name": "latitude",
            "value": lat
        }, {
            "name": "longitude",
            "value": lng
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