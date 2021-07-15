// Only one Only first canvas ! => document.querySelector('canvas');
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control_color");
const range = document.getElementById("brush_range");
const mode = document.getElementById("mode_fill");
const save = document.getElementById("mode_save");

const colorList = Array.from(colors);
colorList.forEach(el => el.addEventListener("click", handleColorClick));

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

let painting = false;


// canvas pixel size !
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_COLOR;


function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
    //console.log(painting);
    //console.log(event);
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    //console.log(event.target.style);
}

function handleBrushSize(event){
    const size = event.target.valueAsNumber;
    ctx.lineWidth = size;
}

function changeMode(event){
    
    if(event.target.value == 'fill'){
        this.value = 'paint';
        mode.innerHTML = "Fill";
    } else {
        this.value = 'fill';
        mode.innerHTML = "Paint";   
    }
}

function changeCanvasColor(event){

    if(mode.value == 'fill'){
        //canvas.style.backgroundColor = ctx.strokeStyle;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

 if(canvas){
     canvas.addEventListener("mousemove", onMouseMove);
     canvas.addEventListener("mousedown", startPainting);
     canvas.addEventListener("mouseup", stopPainting);
     canvas.addEventListener("mouseleave", stopPainting);
     canvas.addEventListener("click", changeCanvasColor);
     canvas.addEventListener("contextmenu", handleCM);
}
    
if(range){
    range.addEventListener("input", handleBrushSize);
}

if(mode){
    mode.addEventListener("click", changeMode);
}

if(save){
    save.addEventListener("click", ()=>{
        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "PaintJS[🎨]";  
        link.click();
    });
}
