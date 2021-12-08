import React, {useCallback} from "react";
import PropTypes from "prop-types";
import "./Card.scss";

function Card({size, content}) {
    const getCardInline = useCallback(() => {
        const base = Math.floor(70 / size);
        return {
            width: `${base}vmin`,
            height: `${base}vmin`,
            fontSize: `${(base - 3) < 2 ? 2 : (base - 3)}vmin`
        };
    }, [size]);

    return (
        <div className="card" style={getCardInline()}>
            {content}
        </div>
    );
}

Card.propTypes = {
    size: PropTypes.number,
    content: PropTypes.number
}

export default Card;