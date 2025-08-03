import * as fabric from 'fabric'; // v6

export function brushHandeler(canvas,props){
    const {color,width}=props;
            canvas.freeDrawingBrush.color=color;
            canvas.freeDrawingBrush.width=width;
            canvas.freeDrawingBrush.shadow.blur=width;
}