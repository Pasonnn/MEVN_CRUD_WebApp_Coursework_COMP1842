// Calculate the area of a rectangle
function calcRectArea(aWidth, aHeight) {
    let area = aWidth * aHeight;
    return area;
}

// process the button click
function doCalc() {
    let newWidth = document.getElementById("width").value;
    let newHeight = document.getElementById("height").value;
    let newArea = calcRectArea(newWidth, newHeight);

    document.getElementById("areaCalc").innerHTML = 
        "The area of the rectangle " + newWidth + " by " + newHeight + " is " + newArea;
}