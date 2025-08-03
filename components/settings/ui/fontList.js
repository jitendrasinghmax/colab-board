const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "cursive",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Lucida Console",
  "Tahoma",
  "Palatino Linotype",
  "Segoe UI",
  "Calibri",
  "Garamond",
  "Courier",
  "Brush Script MT",
  "Monaco",
  "Optima",
  "Futura"
];
export default function FontList({font,setFontFamily}){
    return (
        <>
        <label className="panel-text">Font Style</label>
        <div className="font-panel border border-gray rounded-md">
            {fontFamilies.map((f)=><div key={f} 
                                        className="font-panel-list rounded-sm p-2 "
                                        style={{fontFamily:f,backgroundColor:f===font?"gray":""}} 
                                        onClick={()=>setFontFamily(f)}>{f}</div>)}
        </div>
        </>
    )
}