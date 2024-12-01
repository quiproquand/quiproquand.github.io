const thresholds = [500,770];


function buildRGB(imageData) {
  // console.log(imageData)
  const rgbValues = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
}

function findBiggestColorRange(rgbValues) {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

function quantization(rgbValues, depth){
  const MAX_DEPTH = 4;
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);
    return [color];
  }

  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
}


function luminance(rgb){
  for (var key in rgb) {
    var c = rgb[key];
    c = c / 255.0;
    if (c <= 0.04045) {
      c = c/12.92;
    } else {
      c = ((c+0.055)/1.055) ^ 2.4;
    }
    rgb[key] = c;
  }
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
}

function getColorClass(rgb) {
  if ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 186) {
    return "dark";
  }
  return "bright";
}


function aspectRatio(image) {
    const height = image.naturalHeight;
    const width = image.naturalWidth;

    const gcd = (...arr) => {
        const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
        return [...arr].reduce((a, b) => _gcd(a, b));
    };

    const gcdResult = gcd(width, height);

    return {width: width / gcdResult,height:height / gcdResult};
}

function reloadImager() {
  $("div.imager").each(function(){
    const img = new Image();        
    img.src = this.dataset.img; 
    const ratio = aspectRatio(img);
    const divWidth = this.clientWidth;
    this.style.height = `${divWidth/ratio.width*ratio.height}px`;
  });
}






