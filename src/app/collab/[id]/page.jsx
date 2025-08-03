"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect, useRef, useState } from "react";
import * as fabric from 'fabric'; // v6

export default function ReadOnlyBoard() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  const board = useQuery(api.board.getBoard, {roomId:"999"});
 
  // init canvas once
    useEffect(() => {
        if (canvasRef.current || !canvas) {
            const { height, width } = { height: window.innerHeight, width: window.innerWidth }
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: width,
                height: height,
                backgroundColor: "white"
            })
            initCanvas.renderAll()
            setCanvas(initCanvas)
        }
        return () => {
            initCanvas.dispose();
        setCanvas(null);
        }
    }, [])

  // load state when available
  useEffect(() => {
    if (!canvas || !board) return;
    canvas.loadFromJSON(JSON.parse(board[0].state)).then(() => {
        canvas.renderAll()}) 
  }, [canvas, board]);
  return (
    <div id="canvasContainer">
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
}
