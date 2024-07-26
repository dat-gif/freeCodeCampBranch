import React, { useState } from "react";
import { Languages } from "../constants/repo";

const Card = ({ id, name, description, language, forks, created_at }) => {
  const [isExpansion, setExpansion] = useState(false);

  const onExpansion = () => {};

  return (
    <div
      className="card"
      onClick={() => setExpansion(!isExpansion)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <p className="card-header-title">{name}</p>
      </div>
      <p>{description}</p>
      <p>language: {language ? language : Languages.NONE_LANG}</p>
      <p>{forks}</p>
      <p>{created_at}</p>
      <hr />
    </div>
  );
};

export default Card;
