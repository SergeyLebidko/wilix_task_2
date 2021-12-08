import React from "react";
import PropTypes from "prop-types";
import "./Card.scss";

function Card({content}) {
    return (
        <div className="card">
            {content}
        </div>
    );
}

Card.propTypes = {
    content: PropTypes.number
}

export default Card;