import React, { useState } from "react";
import { ReposEnum } from "../constants/repo";

const Card = ({
  id,
  name,
  description,
  language,
  forks,
  created_at,
  onPromiseClickFn,
  extraInfo,
  ...extraData
}) => {
  const [isExpansion, setExpansion] = useState(false);
  const [expandInfo, setExpandInfo] = useState({});
  const expansionAnimation = ``;

  return (
    <div
      className="card"
      onClick={() => onPromiseClickFn(extraData)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <p className="card-header-title">{name}</p>
      </div>
      <p>{description}</p>
      <p>language: {language ? language : ReposEnum.NONE_LANG}</p>
      <p>{forks}</p>
      <p>{created_at}</p>
      <p>{JSON.stringify(extraInfo)}</p>

      {/* <p style={{ color: "red" }}>
        {Object.values(expandInfo).map((info) => (
          <span>{info}</span>
        ))}
      </p> */}

      {/* <div className={`${!isExpansion ? "hidden" : { expansionAnimation }}`}>
        <p style={{ color: "red" }}>
          {Object.values(expandInfo).map((info) => (
            <span>{info}</span>
          ))}
        </p>
      </div> */}
    </div>
  );
};

export default Card;
