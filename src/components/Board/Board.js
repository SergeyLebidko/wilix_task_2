import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import {createFieldData} from "../../utils";
import {TIMER_START_VALUE} from "../../constants/settings";
import "./Board.scss";

function Board({size, sizeReset}) {
    const [field, setField] = useState([]);
    const [timerValue, setTimerValue] = useState(TIMER_START_VALUE);

    const timer = useRef(null);
    const selected = useRef([]);

    // Пр старте новой игры заполняем карточки числами и запускаем обратный отсчет
    useEffect(() => {
        setField(createFieldData(size));
        timer.current = setInterval(() => setTimerValue(oldValue => oldValue - 1), 1000);
    }, [size]);

    // Если время вышло или все карты открыты - останавливаем таймер
    useEffect(() => {
        if (timerValue === 0 || hasEndGame()) {
            clearInterval(timer.current);
        }
    }, [timerValue, field]);

    const hasEndGame = () => field.every(data => data.hasOpen) && field.length > 0 || timerValue === 0;

    const setCardsOpenFlag = (ids, flag) => {
        setField(oldData => oldData.map(data => ids.includes(data.id) ? {...data, hasOpen: flag} : {...data}));
    }

    const getContentForId = id => {
        for (const data of field) {
            if (data.id === id) return data.content;
        }
    }

    const getHasOpenForId = id => {
        for (const data of field) {
            if (data.id === id) return data.hasOpen;
        }
    }

    const getMessage = () => {
        if (hasEndGame()) {
            if (timerValue === 0) {
                return 'Время истекло...';
            } else {
                return `Вы справились за ${TIMER_START_VALUE - timerValue} сек!`;
            }
        } else {
            return `Осталось: ${timerValue} сек.`;
        }
    }

    const cardClickHandler = id => {
        // Запрещаем клики по карточкам после того, как игра завершена
        if (hasEndGame()) return;

        // Запрещаем клики по уже открытым карточкам
        if (getHasOpenForId(id)) return;

        selected.current.push(id);
        if (selected.current.length === 3) {
            const firstSelect = selected.current[0];
            const secondSelect = selected.current[1];
            if (getContentForId(firstSelect) !== getContentForId(secondSelect)) {
                setCardsOpenFlag([firstSelect, secondSelect], false);
            }
            selected.current = [selected.current[2]];
        }
        setCardsOpenFlag(selected.current, true);
    }

    return (
        <div className="board">
            <h1 className="board__title">Pair game</h1>
            <h3 className="board__message">{getMessage()}</h3>
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
            {hasEndGame() && <button className="button" onClick={sizeReset}>Сыграть еще раз</button>}
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number,
    sizeReset: PropTypes.func
}

export default Board;