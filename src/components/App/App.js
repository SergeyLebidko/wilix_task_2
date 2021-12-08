import React, {useState} from "react";
import Board from "../Board/Board";
import SizeForm from "../SizeForm/SizeForm";

function App() {
    const [size, setSize] = useState(null);
    return size ? <Board size={size}/> : <SizeForm setSize={setSize}/>;
}

export default App;
