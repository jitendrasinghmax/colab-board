import {NextResponse } from "next/server";
import connect from "../../../../../lib/mongoose/mongoose";
import { updateState } from "../../../../../server/action";

export async function POST(req){
    const state=await req.json();
    console.log(state);

    if(!state){
        return NextResponse.json({state:500})
    }
    try {
        await connect();
      } catch (e) {
        return NextResponse.json({ success: false, error: "DB connection failed" }, { status: 500 });
      }
    const resp=updateState(state);
    if(resp)return NextResponse.json({msg:"sucess"},{status:200})
    return NextResponse.json({status:500})
}