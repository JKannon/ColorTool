const hexInput = document.querySelector("#colorInput");
const inputBox = document.querySelector("#inputColor");
const alteredBox = document.querySelector("#alteredColor");
const alteredText = document.querySelector("#alteredColorText");
const sliderText = document.querySelector("#sliderText");
const slider = document.querySelector("#colorSlider");
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
	if(toggleBtn.classList.contains('toggled')){
		toggleBtn.classList.remove('toggled');
		darkenText.classList.remove('selected-text');
		lightenText.classList.add('selected-text');
	}
	else{
		toggleBtn.classList.add('toggled');
		darkenText.classList.add('selected-text');
		lightenText.classList.remove('selected-text');
	}
	reset();
});

const isValidHex = (hex) => {
    //return false if the value is blank or null
    if(!hex) return false;
    // strip the # out of the value if it exists
    strippedHex = hex.replace("#", "");
    // return true is the length is 3 or 6
    return strippedHex.length === 3 || strippedHex.length === 6;
}

hexInput.addEventListener('keyup', ()=>{
    const userHexValue = hexInput.value;
    // return out of function if the hex is not valid
    if (!isValidHex(userHexValue)) return; 
    
    // execute to below code if hex is valid
    const strippedHex = userHexValue.replace("#", "");
    inputBox.style.backgroundColor = `#${strippedHex}`;

    // The above is code is the same as doing this:

    // if (isValidHex(userHexValue)) {
    //     strippedHex = userHexValue.replace("#", "");
    //     inputBox.style.backgroundColor = `#${strippedHex}`;
    // }
    // else{
    //     return;
    // }
	reset();

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
    
    // by parsing each pair to 16 radix parseInt("", 16)
    const r  = parseInt(strippedHex.substring(0,2), 16);
  	const g  = parseInt(strippedHex.substring(2,4), 16);
  	const b  = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b};
}

const convertRGBToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    // ^ automatically add a leading 0 and only return the 
    //   last 2 integers with .slice(-2)
    
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const increaseRGB = (color, increase) => {
    // if (color + increase > 255) return 255;
    // if (color + increase < 0) return 0;
    // return color + increase;

   // Alternate Approach:

   return Math.min(255, Math.max(0, color + increase));

   // ^ find the max between 0 and hex + amount incase it is lower than 0
   // ^ find the lower number between 255 and hex + amount incase it is higher than 255
} 

const alterColor = (hex, percentage) => {
   const {r,g,b} =  convertHexToRGB(hex);   
   let increase = Math.floor((percentage / 100) * 255);

   newR = increaseRGB(r, increase);
   newG = increaseRGB(g, increase);
   newB = increaseRGB(b, increase);

   return convertRGBToHex(newR, newG, newB);
}

slider.addEventListener("input", ()=>{
    //check if hex is valid
    // return out of function if the hex is not valid
    if (!isValidHex(hexInput.value)) return null; 
	
    sliderText.textContent = `${slider.value}%`;

	// if the button is toggled we want to make the slider value negative
	const sliderValue = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;

	const alteredColor = alterColor(hexInput.value, sliderValue);
	console.log(alteredColor);
	alteredBox.style.backgroundColor = alteredColor;
	alteredText.innerText = `Altered Color: ${alteredColor}`; 
});

const reset = () => {
	slider.value = 0;
	sliderText.innerText = `0%`;
	alteredBox.style.backgroundColor = hexInput.value;
	alteredText.innerText = `Altered Color: ${hexInput.value}`; 
}
