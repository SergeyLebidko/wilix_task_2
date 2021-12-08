import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./Board.scss";
import {createFieldData} from "../../utils";
import Card from "../Card/Card";

function Board({size}) {
    const [field, setField] = useState([]);

    useEffect(() => {
        setField(createFieldData(size));
    }, [size]);

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
            <button className="button">Сыграть еще раз</button>
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number
}

export default Board;