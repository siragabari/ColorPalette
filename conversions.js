"use-strict"

// Convert HEX to RGB
function hexToRgb(hex) {
    let result = [];
    result.r = parseInt(''+hex[1]+hex[2], 16);
    result.g = parseInt(''+hex[3]+hex[4], 16);
    result.b = parseInt(''+hex[5]+hex[6], 16);
    return result;
}

// Convert RGB to HEX
function rgbToHex(rgb) {
    return '#' + intToHex(rgb.r) + intToHex(rgb.g) + intToHex(rgb.b);;
}

function intToHex(num) {
    let result = num.toString(16);
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

// Convert RGB to HSL
function rgbToHsl(rgb) {
    let r = rgb.r/255;
    let g = rgb.g/255;
    let b = rgb.b/255;
    let result = [];

    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
    
    if(max === min) {
        result.h = 0;
    } else
    if (max === r) {
        result.h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
        result.h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
        result.h = 60 * (4 + (r - g) / (max - min) );
    }
    
    if (result.h < 0) {result.h = result.h + 360; }
    
    result.l = (min + max) / 2;
    
    if (max === 0 || min === 1 ) {
        result.s = 0;
    } else {
        result.s = (max - result.l) / ( Math.min(result.l,1-result.l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    result.s *= 100;
    result.l *= 100;

    result.h = Math.round(result.h,0);
    result.s = Math.round(result.s,0);
    result.l = Math.round(result.l,0);
    return result;
}

// Convert HSL to RGB
function hslToRgb(hsl) {
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    let result = [];
    
    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    result.r = r;
    result.g = g;
    result.b = b;
    return result;
}

// Create HSL string usable in CSS
function parseHsl(h,s,l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Convert RGB to display string
function rgbString(rgb) {
    return rgb.r + '.' + rgb.g + '.' + rgb.b;
}

// Convert HSL to display string
function hslString(hsl) {
    return hsl.h + '%.' + hsl.s + '%.' + hsl.l + '%';
}
