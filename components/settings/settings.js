"use client"
import { useState, useEffect } from 'react'
import InputDark from './ui/inputDark';
import Colors from './ui/colors';
import { render } from '../../lib/render/render';
import { renderWithOutSaveState } from '../../lib/render/render-without-savesate';
import FontList from './ui/fontList';
import { brushHandeler } from '../../lib/draw/brush';

export default function ({ canvas, saveState }) {
    const [selected, setSelected] = useState(null)
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [diameter, setDiameter] = useState("");
    const [bgcolor, setBgcolor] = useState("");
    const [color, setColor] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [resizeFont, setResizeFont] = useState(false);
    const [brushProps,setBrushProps]=useState("");

    const handelSelection = (object) => {
        if (!object) return null;
        setSelected(object)
        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX))
            setHeight(Math.round(object.height * object.scaleY))
            setBgcolor(object.fill)
            setColor(object.stroke)
            setDiameter("")
            setFontFamily("")
            setBrushProps("");
        }
        else if (object.type === "circle") {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setBgcolor(object.fill)
            setColor(object.stroke)
            setWidth("")
            setHeight("")
            setFontFamily("")
            setBrushProps("")
        }
        else if (object.type === "i-text") {
            setWidth("")
            setHeight("")
            setBgcolor(object.fill)
            setColor(object.stroke)
            setFontFamily(object.fontFamily)
            setDiameter("")
            setBrushProps("")
        }
        else if(object.type==="path"){
            setWidth("")
            setHeight("")
            setBgcolor("")
            setColor("")
            setFontFamily("")
            setDiameter("")
            setBrushProps({
                color:"black",
                width:5,
            })
        }
    }

    const onMouseDownHandeler = () => {
        setResizeFont(true)
    }
    const onMouseMoveHandeler = {
        fontSize: function (e) {
            if (!resizeFont) return;
            const value = e.target.value
            selected.set("fontSize", parseInt(value));
            renderWithOutSaveState(canvas);
        }
    }
    const onMouseUpHandeler = {
        fontSize: function (e) {
            const value = e.target.value
            selected.set("fontSize", parseInt(value));
            setResizeFont(false);
            render(canvas, saveState)
        }
    }

    const handelChange = {
        width: function (e) {
            const value = e.target.value
            const intValue = parseInt(value) || 0;
            setWidth(intValue);
            if (selected && selected.type == 'rect' && intValue > 0) {
                selected.set({ width: intValue / selected.scaleX })
                render(canvas, saveState)
            }
        },
        height: function (e) {
            const value = e.target.value
            const intValue = parseInt(value);
            setHeight(intValue);
            if (selected && selected.type == 'rect' && intValue > 0) {
                selected.set({ height: intValue / selected.scaleY })
                render(canvas, saveState)
            }
        },
        diameter: function (e) {
            const value = e.target.value
            const intValue = parseInt(value);
            setDiameter(intValue);
            if (selected && selected.type == 'circle' && intValue > 0) {
                selected.set({ diameter: intValue / selected.scaleY })
                render(canvas, saveState)
            }
        },
        bgcolor: function (c) {
            setBgcolor(c);
            selected.set({ fill: c })
            render(canvas, saveState)
        },
        strokeColor: function (c) {
            setColor(c);
            selected.set({ stroke: c })
            selected.set({ strokeWidth: 2 })
            render(canvas, saveState)
        },
        fontSize: function (e) {
            const value = e.target.value
            selected.set("fontSize", parseInt(value));
            render(canvas, saveState);
        },
        fontFamily: function (f) {
            selected.set("fontFamily", f);
            setFontFamily(f)
            render(canvas, saveState);
        },
        brush:{
            width:function(width){
                setBrushProps((prev)=>({...prev,width}))
                brushHandeler(canvas,{...brushProps,width});
            },
            color:function(color){
                setBrushProps((prev)=>({...prev,color}));
                brushHandeler(canvas,{...brushProps,color})
            }

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
            canvas.on("object:added",(event)=>{
                if(event.target.type!=="path")return;
                handelSelection(event.target)
            })
        }
    }, [canvas])
    if (selected) {
        return (
            <>
                <div className='settings-panel'>
                    {selected.type === 'rect' &&
                        <>
                            <div className='m-2 flex flex-col justify-center border rounded-md m-4'>
                                <label className='panel-text'>Width</label>
                                <InputDark value={width} onValueChange={handelChange.width} />
                                <label className='panel-text'>Height</label>
                                <InputDark value={height} onValueChange={handelChange.height} />
                            </div>
                            <div className='m-2'>
                                <label className='panel-text'>Background</label>
                                <Colors color={bgcolor} setColor={handelChange.bgcolor} />
                            </div>
                            <div className='stroke m-2'>
                                <label className='panel-text'>Stroke</label>
                                <Colors color={color} setColor={handelChange.strokeColor} />
                            </div>
                        </>

                    }
                    {
                        selected.type === "circle" &&
                        <>
                            <div className='m-2 flex flex-col justify-center border rounded-md m-4'>
                                <label className='panel-text'>Diameter</label>
                                <InputDark value={diameter} onValueChange={handelChange.diameter} />
                            </div>
                            <div className='m-2'>
                                <label className='panel-text'>Background</label>
                                <Colors color={bgcolor} setColor={handelChange.bgcolor} />
                            </div>
                            <div className='stroke m-2'>
                                <label className='panel-text'>Stroke</label>
                                <Colors color={color} setColor={handelChange.strokeColor} />
                            </div>
                        </>
                    }
                    {selected.type === 'i-text' &&
                        <>
                            <div className='m-2 flex flex-col justify-center border rounded-md m-4'>
                                <label className='panel-text'>Font Size</label>
                                <input type='range' min="0" max="100"
                                    onMouseDown={onMouseDownHandeler}
                                    onMouseMove={onMouseMoveHandeler.fontSize}
                                    onMouseUp={onMouseUpHandeler.fontSize}
                                ></input>
                            </div>
                            <div className='m-2'>
                                <label className='panel-text'>Background</label>
                                <Colors color={bgcolor} setColor={handelChange.bgcolor} />
                            </div>
                            <FontList font={fontFamily} setFontFamily={handelChange.fontFamily} />
                        </>
                    }
                    {
                        selected.type==="path"&&
                        <>
                            <div className='m-2 flex flex-col justify-center border rounded-md m-4'>
                                <label className='panel-text'>Width</label>
                                <input type="range" min="1" max="20" value={brushProps.width} 
                                       onChange={(e)=>handelChange.brush.width(e.target.value)}></input>
                            </div>
                            <div className='m-2'>
                                <label className='panel-text'>volor</label>
                                <Colors color={bgcolor} setColor={handelChange.brush.color} />
                            </div>
                        </>
                    }

                </div>
            </>
        )
    }
    else return <></>
}