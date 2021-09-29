"use-strict";

let harmony = '1';

// Manage check of checkboxes
function selectHarmony(id) {
    harmony = '' + id;
    for (let i=1; i <= 6; i++) {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
}

// Calculate analogous colors
function analogous(hsl, interval) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        if (i<=2) {
            color.h = (hsl.h - interval*i) % 360;
        }else {
            color.h = (hsl.h + interval*i) % 360;
        }
        color.s = hsl.s;
        color.l = hsl.l;
        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Calculate monochromatic colors
function monochromatic(hsl, interval) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        color.h = hsl.h;
        if (i<=2) {
            if (i===1) {
                color.s = hsl.s + interval;
            }else {
                color.s = hsl.s - interval;
            }
            color.l = hsl.l;
        }else {
            color.s = hsl.s;
            if (i===3) {
                color.l = hsl.l - interval;
            }else {
                color.l = hsl.l + interval;
            }
        }
        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Calculate triad colors
function triad(hsl, intervalH, intervalL) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        if (i<=2) {
            color.h = hsl.h + intervalH;
        }else {
            color.h = hsl.h + intervalH*2;
        }
        color.s = hsl.s;
        if (i%2 != 0) {
            color.l = hsl.l - intervalL;
        }else {
            color.l = hsl.l;
        }

        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Calculate complementary colors
function complementary(hsl, intervalS, intervalL) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        if (i<=2) {
            color.h = hsl.h;
            if (i===1) {
                color.s = hsl.s + intervalS;
                color.l = hsl.l + intervalL;
            }else {
                color.s = hsl.s - intervalS;
                color.l = hsl.l - intervalL;
            }
        }else {
            color.h = hsl.h + 180;
            color.s = hsl.s;
            if (i===3) {
                color.l = hsl.l + intervalL;
            }else {
                color.l = hsl.l;
            }
        }
        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Calculate compound colors
function compound(hsl, intervalH, intervalL) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        if (i<=2) {
            if (i===1) {
                color.h = (hsl.h + intervalH*i) % 360;
            }else {
                color.h = (hsl.h - intervalH*i) % 360;
            }
            color.s = hsl.s;
            color.l = hsl.l;
        }else {
            color.h = hsl.h + 180;
            color.s = hsl.s;
            if (i===3) {
                color.l = hsl.l - intervalL;
            }else {
                color.l = hsl.l;
            }
        }
        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Calculate shades colors
function shades(hsl, interval) {
    let colors = [hsl];
    for(let i=1; i<=4; i++) {
        let color = [];
        color.h = hsl.h;
        color.s = hsl.s;
        if (i<=2) {
            color.l = hsl.l - interval*(i-2);
        }else {
            color.l = hsl.l + interval*(i-2);
        }
        color = fixColor(color);
        colors.push(color);
    }
    return colors;
}

// Fix the parameters of the calculated colors
function fixColor(color) {
    if (color.h > 360) {
        color.h = color.h - 360;
    }
    if (color.h < 0) {
        color.h = 360 + color.h;
    }
    if (color.s > 100) {
        color.s = 100;
    }
    if (color.s < 0) {
        color.s = 0;
    }
    if (color.l > 100) {
        color.l = 100;
    }
    if (color.l < 0) {
        color.l = 0;
    }
    return color;
}
