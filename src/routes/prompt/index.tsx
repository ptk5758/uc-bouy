import { Link } from "react-router-dom"
import "../../css/prompt.css"
import { useSerialNetwork } from "../../contexts/serialNetwork"
import { useCallback, useEffect, useRef, useState } from "react"

type CommandType = "SEND" | "RECEIVE" | "ERROR"
interface PromptLog
{
    line : string;
    type : CommandType
}
export default function() {
    const [log, setLog] = useState<PromptLog[]>([])
    const { setListener, error, port } = useSerialNetwork()
    const receiveHandle = useCallback((data : string) => {        
        setLog(prev => [...prev, {line : data, type : "RECEIVE"}])
    }, [])
    useEffect(() => {
        setListener(receiveHandle)
        return () => {
            setListener(() => {})
        }
    }, [])    
    const sendHandle = useCallback(async (text : string) => {
        try {
            let buffer = new TextEncoder().encode(text);
            const writer = port?.writable.getWriter()
            await writer?.write(buffer)
            await writer?.close()
            setLog(prev => [...prev, {line : text, type : "SEND"}])
        } catch (error) {
            let message = "Error...."
            if (error instanceof Error) {
                message = error.message
            }
            setLog(prev => [...prev, {line : message, type : "ERROR"}])
        }
    }, [])
    return (
        <div className="prompt">
            <div className="board">
                <div className="top">
                    <h1>Prompt</h1>
                    <Link to={"/"}>HOME</Link>
                </div>
                <Terminal
                    lines={log}
                />
            </div>
            <div className="command">
                <Input
                    textHandle={sendHandle}
                />
            </div>
        </div>
    )
}

function Input({textHandle} : { textHandle? : (text : string) => void }) {
    const field = useRef<HTMLTextAreaElement>(null)
    const sendHandle = useCallback(() => {        
        if (field.current && field.current.value !== "") {            
            textHandle?.call(null, field.current.value)
            field.current.value = ""
        }
    }, [])    
    return (
        <div className="field">
            <textarea ref={field}></textarea>
            <button onClick={sendHandle}>SEND</button>
        </div>
    )
}

function Terminal({lines} : { lines : PromptLog[] }) {
    return (
        <div className="terminal">
            {lines.map(({line, type}, index) => <p className={type} key={index}>{line}</p>)}
        </div>
    )    
}