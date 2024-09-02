import { useCallback, useEffect, useRef, useState } from "react";

async function dataHandler(port : SerialPort) {
  const textDecoder = new TextDecoderStream()
  let dataBuffer = ""  
  const reader = port.readable.pipeThrough(textDecoder)
  .pipeThrough(new TransformStream({
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
      console.log(value)
    }

  }

}

function App() {
  const [port, setPort] = useState<SerialPort>()
  useEffect(() => {
    if (port) {
      port.open({ baudRate : 9600 })
      .then(() => dataHandler(port))
      .catch(error => {console.error(error)})
    }
    return () => {
      if (port) {
        port.close()
      }
    }
  }, [port])
  return (
    <div>
      <h1>울산과학대학교</h1>
      <hr/>
      <DeviceSelect onSelect={(result) => setPort(result)}/>
    </div>
  );
}

function DeviceSelect({ onSelect } : {onSelect? : (port : SerialPort) => void}) {
  const clickHandle = useCallback(() => {
    if ("serial" in navigator) {
      navigator.serial.requestPort()
      .then(port => {
        onSelect?.call(null, port)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      alert("시리얼 통신을 지원하지 않는 브라우저 입니다.")
    }
  }, [])
  return <button onClick={clickHandle}>선택</button>
}

export default App;