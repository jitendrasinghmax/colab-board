 import * as fabric from 'fabric'; // v6

 export const addRect = function (canvas) {
        if (canvas) {
            const rect = new fabric.Rect({
                top: 20,
                left: 20,
                height: 100,
                width: 100,
                fill:"transparent",
                stroke:"gray",
                strokeWidth:2
            })
            rect.set({
                borderColor: '#31B0A3',
                cornerColor: '#31B0A3',
                cornerStrokeColor: '#31B0A3',
                cornerSize: 12,
                cornerStyle: 'rect',
                transparentCorners: false,
              });
            canvas.add(rect)
        }
    }
export const addCircle = function (canvas) {
        if (canvas) {
            const circle = new fabric.Circle({
                top: 100,
                left: 100,
                radius: 50,
                fill:"transparent",
                stroke:"gray",
                strokeWidth:2
            })
            circle.set({
                borderColor: '#31B0A3',
                cornerColor: '#31B0A3',
                cornerStrokeColor: '#31B0A3',
                cornerSize: 12,
                cornerStyle: 'rect',
                transparentCorners: false,
              });
            canvas.add(circle)
        }
    }