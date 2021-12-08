import React, {useState} from "react";
import Board from "../Board/Board";
import SizeForm from "../SizeForm/SizeForm";
import './App.scss';

function App() {
    const [size, setSize] = useState(null);

    return (
        <div>
            {size ? <Board/> : <SizeForm/>}
        </div>
    );
}

export default App;
