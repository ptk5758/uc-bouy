import { useCallback, useEffect, useState } from "react"

interface TelemetryProp
{
    reader : ReadableStream<string>
}
interface Telemetry
{
    data : string | undefined;
    error : string | undefined;
}
export function useTelemetry({ reader } : TelemetryProp) : Telemetry {
    const [data, setData] = useState<string>()    
    const [error, setError] = useState<string>()
    const handleStream = useCallback(async () => {
        let cnt = 0
        try {
            const readeStream = reader.getReader()
            while (true) {
                const { done, value } = await readeStream.read()
                if (done) { 
                    console.log("[Done]")
                    break
                }
                cnt = cnt + 1
                setData(prev => `[${cnt}] ${value}`)
            }
        } catch (error) {
            let message = "Error..";
            if (error instanceof Error) {
                message = error.message;
            }
            setError(message);
        }     
    }, [reader])

    useEffect(() => {
        handleStream();
    }, [reader])

    return { data , error }
}