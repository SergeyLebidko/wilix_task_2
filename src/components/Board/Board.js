import React from "react";
import PropTypes from "prop-types";
import "./Board.scss";

function Board({size}) {
    return (
        <div>
            Игровое поле размера {size}
        </div>
    );
}

Board.propTypes = {
    size: PropTypes.number
}

export default Board;