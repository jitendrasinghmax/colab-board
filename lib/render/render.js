export function render(canvas,saveState,isCollab){
    canvas.renderAll();
    saveState(canvas,isCollab);
}