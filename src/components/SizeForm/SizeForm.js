import React, {useRef} from "react";
import PropTypes from "prop-types";
import {DEFAULT_SIZE} from "../../constants/settings";
import "./SizeForm.scss";

function SizeForm({setSize}) {
    const inputRef = useRef(null);

    const startHandler = () => {
        const size = inputRef.current.value;
        setSize(size);
    }

    return (
        <form>
            <label htmlFor="size_input">Кол-во карточек по вертикали/горизонтали:</label>
            <input ref={inputRef} id="size_input"/>
            <button onClick={startHandler}>Начать игру</button>
            <p>
                Обратите внимание: в поле можно ввести только чётное число от 2 до 10.
                Если значение некорректное (то есть нечётное или не в пределах 2-10),
                то будет установлено количество карточек по-умолчанию ({DEFAULT_SIZE}).
            </p>
        </form>
    );
}

SizeForm.propTypes = {
    setSize: PropTypes.func
}

export default SizeForm;