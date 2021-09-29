"use-strict";
window.addEventListener('load', getSelectedColor);

// Get the selected color
function getSelectedColor() {
    displayColors({'h': 0, 's': 100, 'l': 50});
    const color = document.getElementById("color");
    color.addEventListener('input', function() {
        const hex = color.value;
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb);
        displayColors(hsl);
    });
}

// Show the colors and their codes
function displayColors(hsl) {
    const colors = getColors(hsl);
    for (let i=0; i<colors.length; i++) {
        let colorDisplay = document.getElementById("colorDisplay" + (i+1));
        colorDisplay.style.backgroundColor = parseHsl(colors[i].h, colors[i].s, colors[i].l);
        let colorHex = document.getElementById("colorHex" + (i+1));
        colorHex.innerHTML = rgbToHex(hslToRgb(colors[i]));
        let colorRgb = document.getElementById("colorRgb" + (i+1));
        colorRgb.innerHTML = rgbString(hslToRgb(colors[i]));
        let colorHsl = document.getElementById("colorHsl" + (i+1));
        colorHsl.innerHTML = hslString(colors[i]);
    }
}

// Get the palette of colors depending on the selected harmony
function getColors(hsl) {
    let colors = [];
    let c = [];
    switch(harmony) {
        case '1':
            c = analogous(hsl, 15);
            break;
        case '2':
            c = monochromatic(hsl, 30);
            break;
        case '3':
            c = triad(hsl, 120, 20);
            break;
        case '4':
            c = complementary(hsl, 20, 10);
            break;
        case '5':
            c = compound(hsl, 20, 20);
            break;
        case '6':
            c = shades(hsl, 20);
            break;
    }
    colors = [c[2], c[1], c[0], c[3], c[4]];
    return colors;
}
