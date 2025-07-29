"use client"
import { useState, useEffect } from 'react'
import InputDark from './ui/inputDark';
import Colors from './ui/colors';
import { render } from '../../lib/render';

export default function ({ canvas,saveState }) {
    const [selected, setSelected] = useState(null)
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("")

    const handelSelection = (object) => {
        if (!object) return null;
        setSelected(object)
        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX))
            setHeight(Math.round(object.height * object.scaleY))
            setColor(object.fill)
            setDiameter("")
        }
        else if (object.type === "circle") {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill)
            setWidth("")
            setHeight("")
        }
    }

    const handelChange={
        width:function(e){
            const value=e.target.value
            const intValue=parseInt(value)||0;
            setWidth(intValue);
            if(selected&&selected.type=='rect'&&intValue>0){
                selected.set({width:intValue/selected.scaleX})
                render(canvas,saveState)
            }
        },
        height:function(e){
            const value=e.target.value
            const intValue=parseInt(value);
            setHeight(intValue);
            if(selected&&selected.type=='rect'&&intValue>0){
                selected.set({height:intValue/selected.scaleY})
                render(canvas,saveState)
            }
        },
        bgcolor:function(c){
            setColor(c);
            selected.set({fill:c})
            render(canvas,saveState)
        },
        strokeColor:function(c){
            setColor(c);
            selected.set({stroke:c})
            selected.set({strokeWidth:2})
            render(canvas,saveState)
        }
    }

    const handelClear = () => {
        setDiameter("")
        setColor("")
        setWidth("")
        setHeight("")
        setSelected(null)
    }

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (event) => handelSelection(event.selected[0]))
            canvas.on("selection:cleared", () => handelClear())
            canvas.on("selection:updated", (event) => handelSelection(event.selected[0]))
            canvas.on("object:modified", (event) => handelSelection(event.target))
            canvas.on("object:scaling", (event) => handelSelection(event.target))
        }
    }, [canvas])

console.log(diameter)
    if (selected) {
        return (
            <>
                <div id='settings-palen' className='settings-panel'>
                    
                        {selected.type==='rect'&&
                            <div className='p-10 flex flex-col justify-center border rounded-md m-4'>
                                <label className='dark'>width</label>
                                <InputDark value={width} onValueChange={handelChange.width}/>
                                <label className='dark'>height</label>
                                <InputDark value={height} onValueChange={handelChange.height}/>
                            </div>
                        }
                        <div className='m-4'>
                            <Colors color={color} setColor={handelChange.bgcolor}/>
                        </div>
                        <div className='stroke m-4'>
                            <p>stroke</p>
                            <Colors color={color} setColor={handelChange.strokeColor}/>
                        </div>
                    
                </div>
            </>
        )
    }
    else return <></>
}