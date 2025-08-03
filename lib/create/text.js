import * as fabric from 'fabric'
export const addText = (canvas) => {
    if (canvas) {
        const text = new fabric.IText("Edit me", {
            left: 200,
            top: 200,
            fontSize: 24,
            fontFamily:"cursive",
            fill: "black",
            lockScalingX: true,
            lockScalingY: true
        });

        canvas.add(text);
    }
};
