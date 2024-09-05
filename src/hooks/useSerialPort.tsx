import { useCallback, useEffect, useState } from "react";

interface ISerialPort
{
    port : SerialPort | undefined;
    request : () => void;
    error : string | undefined;
}


/**
 * ID,DATA => LINE
 */
export function useSerialPort({ onData } : { onData : (data : string) => void }) : ISerialPort
{
    const [port, setPort] = useState<SerialPort | undefined>()

    const [error, setError] = useState<string | undefined>()

    const selectPort = useCallback(async () => {
        try {            
            setPort(await navigator.serial.requestPort())
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }, [])

    useEffect(() => {
        if (port) {
          port.open({ baudRate : 9600 })
          .then(() => dataHandler(port))
          .catch(error => { setError(error.message) })
        }
        return () => {
          if (port) {
            port.close()
            .catch(error => setError(error.message))
          }
        }
    }, [port])
    
    const dataHandler = useCallback(async (port : SerialPort) => {
        const textDecoder = new TextDecoderStream()
        let dataBuffer = ""  
        const reader = port.readable.pipeThrough(textDecoder).pipeThrough(new TransformStream({
            transform : (chunk, controller) => {
                dataBuffer += chunk
                const lines = dataBuffer.split("\n")
                dataBuffer = lines.pop() || ""
                lines.forEach(line => controller.enqueue(line))
            }
        }))
        .getReader()
        while (true) {
            const { value, done } = await reader.read()
            if (done) {
                reader.releaseLock()
                break
            }
            if (value) {
                onData(value)
            }
    
        }
    }, [onData])        

    return {
        error,
        port,
        request : selectPort
    }
}