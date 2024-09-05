import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSerialPort } from "../hooks/useSerialPort";

interface SerialNetwork
{
    port : SerialPort | undefined;
    request : () => void;
    setListener : (func: (data: string) => void) => void;    
    error :string | undefined;
}
const serialNetwork = createContext<SerialNetwork|undefined>(undefined)

export function SerialNetworkProvider({children} : {children : React.ReactNode}) {
    const listener = useRef<((data : string) => void)>()
    const dataHandle = useCallback((data : string) => {
        if (listener.current) {
            listener.current(data)
        }
     }, [listener])
    const { error, port, request } = useSerialPort({onData : dataHandle})
    return (
        <serialNetwork.Provider value={{
            port,
            request,
            setListener : (func : ((data : string) => void)) => { listener.current = func },
            error
        }}>
            { children }
        </serialNetwork.Provider>
    )
}
export function useSerialNetwork() {
    const serialNetworkContext = useContext(serialNetwork)
    if (!serialNetworkContext) {
        throw new Error("Serial Network Context Null Error")
    }
    return serialNetworkContext
}