import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {DEFAULT_SIZE} from "../../constants/settings";
import "./SizeForm.scss";

function SizeForm({setSize}) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const startHandler = e => {
        e.preventDefault();
        const size = +inputRef.current.value;
        if (isNaN(size) || (size % 2) !== 0 || size < 2 || size > 10) {
            inputRef.current.value = DEFAULT_SIZE;
            return;
        }
        setSize(size);
    }

    return (
        <form className="size_form">
            <label className="size_form__label" htmlFor="size_input">
                Количество карточек по вертикали и горизонтали:
            </label>
            <input className="size_form__size_input" ref={inputRef} id="size_input"/>
            <p className="size_form__warning_text">
                Обратите внимание: в поле можно ввести только чётное число от 2 до 10.
                Если значение некорректное (то есть нечётное или не в пределах 2-10),
                то будет установлено количество карточек по-умолчанию ({DEFAULT_SIZE}).
            </p>
            <button className="button" onClick={startHandler}>Начать игру</button>
        </form>
    );
}

SizeForm.propTypes = {
    setSize: PropTypes.func
}

export default SizeForm;