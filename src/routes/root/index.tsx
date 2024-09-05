import { useCallback, useEffect } from "react"
import { useSerialPort } from "../../hooks/useSerialPort"
import { useSerialNetwork } from "../../contexts/serialNetwork"

function RootRoute() {
    const { port, error, request, setListener } = useSerialNetwork()
    const dataHandle = useCallback((data : string) => {
        console.log(`[Serial] : ${data}`)
    }, [])
    useEffect(() => {
        setListener(dataHandle);
        return () => {
          setListener(() => {});
        };
      }, [setListener]);
    if (!port) {
        return <div><button onClick={request}>Serial Port Select</button></div>
    }
    if (error) {
        return (
            <div>
                <h1>Error : {error}</h1>
                <button onClick={request}>RE Serial Port Select</button>
            </div>
        )
    }
    return (
        <div>
            <button onClick={request}>Serial Port Select</button>
            <h1>바로가기</h1>
            <NavigationItem href="telemetry" text="Telemtry [측정정보]"/>
            <NavigationItem href="prompt" text="Prompt [원격통신]"/>
        </div>
    )
}

interface NavigationItemProp
{
    href : string
    text : string    
}
function NavigationItem({href, text} : NavigationItemProp) {
    return <a href={href}><h1>{text}</h1></a>
}

export default RootRoute