import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "./Board.scss";
import {createFieldData} from "../../utils";
import Card from "../Card/Card";

function Board({size, sizeReset}) {
    const [field, setField] = useState([]);
    const [timerValue, setTimerValue] = useState(60);

    const timer = useRef(null);

    // Пр старте новой игры заполняем карточки числами и запускаем обратный отсчет
    useEffect(() => {
        setField(createFieldData(size));
        timer.current = setInterval(() => setTimerValue(oldValue => oldValue - 1), 1000);
    }, [size]);

    // Если время вышло или все карты открыты - останавливаем таймер
    useEffect(() => {
        if (timerValue === 0 || hasAllCardOpen()) {
            clearInterval(timer.current);
        }
    }, [timerValue, field]);

    const hasAllCardOpen = () => field.every(data => data.hasOpen) && field.length > 0;

    const setCardsOpenFlag = (ids, flag) => {
        setField(oldData => oldData.map(data => ids.includes(data.id) ? {...data, hasOpen: flag} : {...data}));
    }

    const cardClickHandler = id => {
        setCardsOpenFlag([id], true);
    }

    return (
        <div className="board">
            <h1 className="board__title">Pair game</h1>
            <h3 className="board__timer">
                {timerValue > 0 ? `Осталось: ${timerValue} сек.` : 'Время истекло...'}
            </h3>
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
            {(hasAllCardOpen() || timerValue === 0) &&
            <button className="button" onClick={sizeReset}>Сыграть еще раз</button>
            }
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number,
    sizeReset: PropTypes.func
}

export default Board;