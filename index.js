const hexInput = document.querySelector("#colorInput");
const inputBox = document.querySelector("#inputColor");

const isValidHex = (hex) => {
    //return false if the value is blank or null
    if(!hex) return false;
    // strip the # out of the value if it exists
    strippedHex = hex.replace("#", "");
    // return true is the length is 3 or 6
    return strippedHex.length === 3 || strippedHex.length === 6;
}

hexInput.addEventListener('keyup', ()=>{
    userHexValue = hexInput.value;
    // return out of function if the hex is not valid
    if (!isValidHex(userHexValue)) return; 
    
    // execute to below code if hex is valid
    strippedHex = userHexValue.replace("#", "");
    inputBox.style.backgroundColor = `#${strippedHex}`;

    // The above is code is the same as doing this:

    // if (isValidHex(userHexValue)) {
    //     strippedHex = userHexValue.replace("#", "");
    //     inputBox.style.backgroundColor = `#${strippedHex}`;
    // }
    // else{
    //     return;
    // }
});

const convertHexToRGB = (hex) => {
    // return out of function if the hex is not valid
    if (!isValidHex(hex)) return null; 
    // strip the # out of the value if it exists
    strippedHex = hex.replace("#", "");

    let rgbValues = [];
    if (strippedHex.length === 3) {
        // double each character for the stripped hex
        strippedHex = strippedHex[0]+strippedHex[0]
        +strippedHex[1]+strippedHex[1]+strippedHex[2]+strippedHex[2];
    }
    // create an array of each hex pair 
    // by splitting the hex string every 2 chars
    const hexArray = strippedHex.match(/.{1,2}/g);
    // convert each pair of in the hex array to its r,g,b value 
    // by parsing each pair to 16 radix parseInt("", 16)
    hexArray.forEach(element => {
        rgbValues.push(parseInt(element.toString(), 16));
    });
    return rgbValues;
}
