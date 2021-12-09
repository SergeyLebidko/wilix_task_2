import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {FIELD_BASE} from "../../constants/settings";
import "./Card.scss";

function Card({size, id, content, hasOpen, cardClickHandler}) {
    const getCardInline = useCallback(() => {
        const base = Math.floor(FIELD_BASE / size);
        return {
            width: `${base}vmin`,
            height: `${base}vmin`,
            fontSize: `${(base - 3) < 2 ? 2 : (base - 3)}vmin`
        };
    }, [size]);

    return (
        <div className="card" style={getCardInline()} onClick={() => cardClickHandler(id)}>
            {hasOpen && content}
        </div>
    );
}

Card.propTypes = {
    size: PropTypes.number,
    id: PropTypes.string,
    content: PropTypes.number,
    hasOpen: PropTypes.bool,
    cardClickHandler: PropTypes.func
}

export default Card;