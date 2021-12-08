import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./Board.scss";
import {createFieldData} from "../../utils";
import Card from "../Card/Card";

function Board({size, sizeReset}) {
    const [field, setField] = useState([]);

    useEffect(() => {
        setField(createFieldData(size));
    }, [size]);

    const hasCardOpen = () => field.every(data => data.hasOpen);

    const cardClickHandler = id => {
        setField(oldData => oldData.map(data => data.id === id ? {...data, hasOpen: true} : {...data}));
    }

    return (
        <div className="board">
            <h1 className="board__title">Pair game</h1>
            <h3 className="board__timer">таймер</h3>
            <div className="board__field" style={{gridTemplateColumns: `repeat(${size}, 1fr)`}}>
                {field.length > 0 &&
                field.map(cardData =>
                    <Card
                        key={cardData.id}
                        size={size}
                        {...cardData}
                        cardClickHandler={cardClickHandler}
                    />
                )}
            </div>
            {hasCardOpen() && <button className="button" onClick={sizeReset}>Сыграть еще раз</button>}
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number,
    sizeReset: PropTypes.func
}

export default Board;