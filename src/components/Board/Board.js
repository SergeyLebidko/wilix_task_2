import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./Board.scss";
import {createFieldData} from "../../utils";

function Board({size}) {
    const [field, setField] = useState([]);

    useEffect(() => {
        setField(createFieldData(size));
    }, []);

    return (
        <div>
            <h1>Pair game</h1>
            <div>
                {field.length > 0 &&
                field.map(({key, content}) => <div key={key}>{content}</div>)
                }
            </div>
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number
}

export default Board;