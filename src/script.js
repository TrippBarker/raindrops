// settings elements
let settingsBTN = document.getElementById('settingsBTN');
let closeSettingsBTN = document.getElementById('closeSettingsBTN');
let settingsCont = document.getElementById('settingsCont');
let dropsH = document.getElementById('dropsH');
let dropsHVal = document.getElementById('dropsHVal');
let dropsW = document.getElementById('dropsW');
let dropsWVal = document.getElementById('dropsWVal');
let trail = document.getElementById('trail');
let trailVal = document.getElementById('trailVal');
let rate = document.getElementById('rate');
let rateVal = document.getElementById('rateVal');
let colorMode = document.getElementById('colorMode');

// drops elements
let dropsCont = document.getElementById('dropsCont');
let drops = document.getElementById('drops');

// drop variables

let height = 15;
let width = 20;
let roygbiv = [[255, 0, 0], [255, 127, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [75, 0, 130], [148, 0, 211]]

// functions

function onInit(){
    createDrops();
    dropRain();
}

function createDrops(){
    while (drops.firstChild){
        drops.removeChild(drops.lastChild);
        console.log('removed');
    }
    const column = document.createElement('div');
    for (let col = 0; col < height; col++){
        const newCol = document.createElement('div');
        newCol.classList.add('col'+col);
        newCol.classList.add('column');
        newCol.classList.add('small-bordered');
        newCol.style.width = 'calc(100%)';
        newCol.style.aspectRatio= '1/1';
        console.log(newCol.style.width)
        newCol.style.height = newCol.width;
        column.appendChild(newCol);
    }
    for (let row = 0; row < width; row++){
        const newRow = document.createElement('div');
        newRow.id = 'row'+row;
        newRow.classList.add('row');
        newRow.appendChild(column.cloneNode(true));
        drops.append(newRow);
    }
}

function updateHeight(dropsH){
    height = dropsH.srcElement.value;
    dropsHVal.textContent = dropsH.srcElement.value;
    createDrops();
}

function updateWidth(dropsW){
    width = dropsW.srcElement.value;
    dropsWVal.textContent = dropsW.srcElement.value;
    createDrops();
}

function updateTrail(trail){
    trailVal.textContent = trail.srcElement.value;
    createDrops();
}

function updateRate(rate){
    rateVal.textContent = rate.srcElement.value;
}

function toggleSettings(){
    settingsCont.classList.toggle('hidden');
    drops.classList.toggle('disabled');
}

async function dropRain(){
    let colNum = Math.floor(Math.random() * (width));
    console.log(colNum);
    let column = document.getElementById(('row'+colNum));
    let r = 0;
    let g = 0;
    let b = 255;
    switch(colorMode.value){
        case 'rainbow':
            roygbivIndex = Math.floor(Math.random() * roygbiv.length);
            r = roygbiv[roygbivIndex][0];
            g = roygbiv[roygbivIndex][1];
            b = roygbiv[roygbivIndex][2];
            console.log(r + ' ' + g + ' ' + b)
            break;
        case 'random':
            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
            break;
        case 'monoTone':
            r = 0;
            g = 0;
            b = 255;
            break;
    }
    setTimeout(function(){
        rainFall(column, 0, r, g, b);
    }, 100);
    setTimeout(function(){
        dropRain();
    }, (16 - Number(rateVal.textContent))*100);
}

async function rainFall(column, index, r, g, b){
    for (let i = 0; i < Number(trailVal.textContent); i++){
        if (index-i < height && index-i >= 0){
            let columnNode = column.childNodes[0].childNodes[index-i];
            columnNode.style.backgroundColor = 'rgb('+(r/Number(trailVal.textContent) * (Number(trailVal.textContent) - i))+','+(g/Number(trailVal.textContent) * (Number(trailVal.textContent) - i))+','+(b/Number(trailVal.textContent) * (Number(trailVal.textContent) - i))+')';
        }
    }
    if (index - Number(trailVal.textContent) >= 0 &&  index - Number(trailVal.textContent) < height){
        let columnNode = column.childNodes[0].childNodes[index - Number(trailVal.textContent)];
        columnNode.style.backgroundColor = 'black';
    }
    if (!(index - Number(trailVal.textContent) > height)){
        setTimeout(function(){
            rainFall(column, index+1, r, g, b);
        }, 100);
    }
}


// listeners
settingsBTN.addEventListener("click", toggleSettings);
closeSettingsBTN.addEventListener("click", toggleSettings);
dropsH.addEventListener("input", updateHeight);
dropsW.addEventListener("input", updateWidth);
trail.addEventListener("input", updateTrail);
rate.addEventListener("input", updateRate);

// Initialize
onInit();