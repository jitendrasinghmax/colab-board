"use client"
import './page.css'

//icons
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";

import * as fabric from 'fabric'; // v6
import React, { useRef, useEffect, useState } from 'react'
import Settings from '../../../components/settings/settings';
import useHistory from '../../../hook/useHistory';

export default function () {
    const canvasRef = useRef(null)
    const [canvas, setCanvas] = useState(null)

    const { undo, redo, saveState } = useHistory();

    const addRect = function () {
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
    const addCircle = function () {
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
    
    useEffect(() => {
        if (canvas) {
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
        if (canvasRef.current) {
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
            if (canvas) canvas.dispose()
        }
    }, [])
    return (
        <>
            <div id="container" className='main'>
                <div id="tool">
                    <button className='tool-button' onClick={addRect}><RiRectangleLine /></button>
                    <button className='tool-button' onClick={addCircle}><FaRegCircle /></button>
                </div>
                <div><Settings canvas={canvas} saveState={saveState} /></div>
            </div>
            <div id="canvasContainer"><canvas className='canvas' ref={canvasRef} /></div>
            <div className='flex absolute undo-redo'>
                <button onClick={handelundo} className='p-3 border rounded-sm undo'>undo</button>
                <button onClick={handelRedo} className='p-3 border rounded-sm redo'>redo</button>
            </div>
        </>
    )
}
