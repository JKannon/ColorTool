// javascript
const hexInput = document.querySelector("#colorInput");
const userHexValue = hexInput.val;

const isValidHex = (hex) => {
    if(!hex) return false;
    strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
}

