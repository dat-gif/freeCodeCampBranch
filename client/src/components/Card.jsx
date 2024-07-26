import React, { useState } from "react";
import { Languages } from "../constants/repo";

const Card = ({
  id,
  name,
  description,
  language,
  forks,
  created_at,
  onClickFn,
  ...extraData
}) => {
  const [isExpansion, setExpansion] = useState(false);
  const [expandInfo, setExpandInfo] = useState({});

  const onExpansion = () => {
    setExpansion(!isExpansion);
    console.log("test");

    setExpandInfo(() => onClickFn(extraData));
  };

  const expansionAnimation = ``;

  return (
    <div
      className="card"
      onClick={() => onExpansion()}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <p className="card-header-title">{name}</p>
      </div>
      <p>{description}</p>
      <p>language: {language ? language : Languages.NONE_LANG}</p>
      <p>{forks}</p>
      <p>{created_at}</p>
      <p>{JSON.stringify(expandInfo)}</p>
      <div className={`${!isExpansion ? "hidden" : { expansionAnimation }}`}>
        <p style={{ color: "red" }}>
          {Object.values(expandInfo).map((info) => (
            <span>{info}</span>
          ))}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Card;
