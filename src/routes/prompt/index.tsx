import { Link } from "react-router-dom"
import "../../css/prompt.css"
export default function() {
    return (
        <div className="prompt">
            <div className="board">
                <div className="top">
                    <h1>Prompt</h1>
                    <Link to={"/telemetry"}>Back</Link>
                </div>
                <Terminal/>
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

function Terminal() {
    return (
        <div className="terminal">
            뿌슝빠슝하였다
        </div>
    )    
}