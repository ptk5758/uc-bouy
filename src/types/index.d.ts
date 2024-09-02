declare interface Navigator {
    serial: {
        requestPort: () => Promise<SerialPort>;
        getPorts: () => Promise<SerialPort[]>;
    };
}
interface SerialPort {
    open(options: { baudRate: number }): Promise<void>;
    close(): Promise<void>;
    readable: ReadableStream<any>;
    writable: WritableStream<any>;
}