import { Link } from "react-router-dom"
import "../../css/prompt.css"
import { useSerialNetwork } from "../../contexts/serialNetwork"
import { useCallback, useEffect, useState } from "react"

type CommandType = "SEND" | "RECEIVE"
interface PromptLog
{
    line : string;
    type : CommandType
}
export default function() {
    const [log, setLog] = useState<PromptLog[]>([])
    const { setListener, error } = useSerialNetwork()
    const dataHandle = useCallback((data : string) => {        
        setLog(prev => [...prev, {line : data, type : "RECEIVE"}])        
    }, [])
    useEffect(() => {
        setListener(dataHandle)
        return () => {
            setListener(() => {})
        }
    }, [])
    return (
        <div className="prompt">
            <div className="board">
                <div className="top">
                    <h1>Prompt</h1>
                    <Link to={"/telemetry"}>Back</Link>
                </div>
                <Terminal
                    lines={log}
                />
            </div>
            <div className="command">
                <Input/>
            </div>
        </div>
    )
}

function Input() {
    return (
        <div className="field">
            <textarea></textarea>
            <button>SEND</button>
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