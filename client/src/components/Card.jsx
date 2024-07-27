import React, { useState } from "react";
import { uid } from "uid";
import { ReposEnum } from "../constants/repo";
import { ReactComponent as ForkIcon } from "../asset/git-fork.svg";
import { ReactComponent as GitIcon } from "../asset/git-icon.svg";
const Card = ({
  id,
  name,
  description,
  language,
  forks,
  created_at,
  onPromiseClickFn,
  extraInfo = null,
  ...otherData
}) => {
  const [isExpansion, setExpansion] = useState(false);
  const onExpansion = () => {
    onPromiseClickFn(otherData);
    setExpansion(!isExpansion);
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title is-size-4 px-5 pt-4">
          <span className="mr-4">
            <GitIcon
              className="icon icon is-medium"
              style={{ position: "relative", top: "5px" }}
            />
          </span>
          {name}
        </p>
      </div>
      <div className="card-content py-3 pb-5">
        <div className="content flex">
          {description && <p className="subtitle is-5 mb-4">{description}</p>}
          <p>
            <span className="is-family-code tag is-info is-medium mr-5">
              {language ? language : ReposEnum.NONE_LANG}
            </span>
            <span className="text-center is-underlined has-text-weight-medium is-relative">
              <ForkIcon
                className="icon icon is-medium"
                style={{ position: "relative", top: "9px" }}
              ></ForkIcon>
              {forks}
            </span>
          </p>
        </div>
      </div>
      <div>
        <button
          className={`button is-fullwidth is-primary is-dark ${
            isExpansion ? "button-expand-open" : "button-expand-close"
          }`}
          onClick={() => onExpansion()}
        >
          Latest Commit
        </button>
        <div
          className={`card-expand ${
            isExpansion ? "card-expand-open" : "card-expand-close"
          }`}
        >
          {extraInfo ? (
            <div className="card-content">
              {Object.entries(extraInfo).map((info) => (
                <div key={uid()}>
                  <p className="is-capitalized has-text-weight-semibold">
                    {info[0]}:
                  </p>
                  <p>{info[1]}</p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div className="card-footer">
              <div className="card-footer-item">
                <button
                  className="button is-loading is-large"
                  style={{ border: "none" }}
                >
                  Loading
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
