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
import Session from "../../../components/collab/create/session";
import { render } from "../../../lib/render/render";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function () {
    const canvasRef = useRef(null)
    const fabricRef=useRef(null);
    const updateConvexState=useMutation(api.board.updateBoardState);
    const [canvas, setCanvas] = useState(null)
    const [isDrawing,setIsDrawing]=useState(false);
    const [openDialog,setOpenDialog]=useState(false);
    const [isCollab,setIsCollab]=useState({
        isCollab:false,
        roomId:"0"
    });

    const {currState, undo, redo, saveState } = useHistory();

    const updateConvexStateHandler = async () => {
        console.log("updateConvexStateHandler called");
        if(isCollab.isCollab===true && isCollab.roomId!=="0"){
            console.log("Updating convex state for roomId:", isCollab.roomId);
            await updateConvexState({
                roomId: isCollab.roomId,
                newState: JSON.stringify(currState)
            });
        }
    }
   
    const handelRedo = function () {
        const state = redo();
        if (state) {
            canvas.off("object:added");
            canvas.off("object:removed");
            canvas.loadFromJSON(state).then(() => {
                canvas.renderAll();
                canvas.on("object:added",()=>render(canvas, saveState));
                canvas.on("object:removed", ()=>render(canvas, saveState));
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
                canvas.on("object:added",()=>render(canvas, saveState));
                canvas.on("object:removed", ()=>render(canvas, saveState));
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
                render(canvas, saveState);
            });
            canvas.on("object:added", ()=>{
                render(canvas, saveState);
            });
            canvas.on("object:removed",()=>{
                render(canvas, saveState);
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
    useEffect(()=>{
        if(currState&&canvas){
            updateConvexStateHandler();
        }
    },[currState])
    return (
        <>
            {openDialog==true&&<Session isCollab={isCollab} setIsCollab={setIsCollab} setOpenDialog={setOpenDialog}/>}
            <button className="share-btn" onClick={()=>setOpenDialog(true)}>share</button>
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
