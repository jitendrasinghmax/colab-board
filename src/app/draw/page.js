"use client"

//icons
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { RiBrushFill } from "react-icons/ri";


import * as fabric from 'fabric'; // v6
import React, { useRef, useEffect, useState } from 'react'
import Settings from '../../../components/settings/settings';
import useHistory from '../../../hook/useHistory';
import { addCircle, addRect } from "../../../lib/create/shape";
import { addText } from "../../../lib/create/text";


export default function () {
    const canvasRef = useRef(null)
    const fabricRef=useRef(null);
    const [canvas, setCanvas] = useState(null)
    const [isDrawing,setIsDrawing]=useState(false);

    const { undo, redo, saveState } = useHistory();

   
    const handelRedo = function () {
        const state = redo();
        if (state) {
            canvas.off("object:added");
            canvas.off("object:removed");
            canvas.loadFromJSON(state).then(() => {
                canvas.renderAll();
                canvas.on("object:added",()=>saveState(canvas) );
                canvas.on("object:removed", ()=>saveState(canvas));
            });
        }
    }
    const handelundo = function () {
        const state = undo();
        if (state) {
            canvas.off("object:added");
            canvas.off("object:removed");
            canvas.loadFromJSON(state).then(() => {
                canvas.renderAll();
                canvas.on("object:added",()=>saveState(canvas) );
                canvas.on("object:removed", ()=>saveState(canvas));
            });
        }
    };
    const handelDrawing=()=>{
        if(!canvas)return;
        if(isDrawing){
            canvas.isDrawingMode=false;
            setIsDrawing(false)
        }
        else{
            canvas.isDrawingMode=true;
            setIsDrawing(true);
        }
    }
    useEffect(() => {
        if (canvas) {
            canvas.freeDrawingBrush=new fabric.PencilBrush(canvas)
                        canvas.freeDrawingBrush.color="black"
                        canvas.freeDrawingBrush.width=5;
                        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                        blur:5,
                        offsetX: 0,
                        offsetY: 0,
                        affectStroke: true,
                        color:"black",
                  });
            canvas.on("object:modified",()=>{
                saveState(canvas)
            });
            canvas.on("object:added", ()=>{
                saveState(canvas)
            });
            canvas.on("object:removed",()=>{
                saveState(canvas)
            });
        }
       
    }, [canvas])
    useEffect(() => {
        if(fabricRef.current)return;
        if (canvasRef.current) {
            const { height, width } = { height: window.innerHeight, width: window.innerWidth }
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: width,
                height: height,
                backgroundColor: "white"
            })
            initCanvas.renderAll()
            fabricRef.current=initCanvas;
            setCanvas(initCanvas)
        }
        return () => {
            if (fabricRef.current) {
            fabricRef.current.dispose();
            fabricRef.current = null;
        }
        }
    }, [])
    return (
        <>
            <div id="container" className=''>
                <div className="tool">
                    <button className='tool-button' onClick={()=>addRect(canvas)}><RiRectangleLine /></button>
                    <button className='tool-button' onClick={()=>addCircle(canvas)}><FaRegCircle /></button>
                    <button className='tool-button' onClick={()=>addText(canvas)}>Aa</button>
                    <button className="tool-button" onClick={handelDrawing}><RiBrushFill/></button>
                </div>
            </div>
            <div className=""><Settings canvas={canvas} saveState={saveState} /></div>
            <div id="canvasContainer"><canvas className='canvas' ref={canvasRef} /></div>
            <div className='flex absolute undo-redo'>
                <button onClick={handelundo} className='p-3  rounded-sm undo'>undo</button>
                <button onClick={handelRedo} className='p-3  rounded-sm redo'>redo</button>
            </div>
        </>
    )
}
