const colors=["#B03131","#B08631","#64B031","#31B0A3","#B031A8","#1C1B1B","#FFFFFF"]
export default function({color,setColor}){

    return (
        <>
        <div className="p-4 grid grid-col-4 gap-4 border border-gray rounded-md m-x-auto">
            {colors.map((c)=>{
                return <div key={c} 
                        style={{width:"25px",height:"25px",backgroundColor:c,border:c===color?"2px solid white":""}} 
                        className="rounded-sm"
                        onClick={()=>setColor(c)}></div>
            })}
        </div>
        </>
    )
} 