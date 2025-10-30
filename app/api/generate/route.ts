import dotenv from 'dotenv'

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

dotenv.config()

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});


export function GET(){
    return NextResponse.json({message:"backend server!!!"})
}

export async function POST(req:NextRequest){

try{
   const body = await req.json(); 
    const { outline } = body;

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: outline,
    config: {
      systemInstruction: process.env.SYSTEM_PROMPT,
    },
  });
  return await NextResponse.json({response:response.text});
 
}
catch(error){
    NextResponse.json({error:error})
}
}

