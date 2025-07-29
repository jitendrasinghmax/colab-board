export function render(canvas,saveState){
    canvas.renderAll();
    saveState(canvas);
}