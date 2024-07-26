import React, { useEffect, useState } from "react";
import { clientAxios } from "../util/axios";
import Card from "./Card";
import { Languages } from "../constants/repo";
import Button from "./Button";
import { uid } from "uid";

const ReposComponent = () => {
  const [reposData, setReposData] = useState([]);
  const [displayRepo, setDisplayRepo] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  const languages = {};
  reposData.forEach((repo) => {
    languages[`${repo.language}`] = repo.language;
  });
  delete languages[null];
  languages[Languages.NONE_LANG] = null;

  const onFilter = (lang) => {
    setDisplayRepo(
      reposData.filter((repo) => repo.language === languages[lang])
    );
    setFilterBy(languages[lang]);
  };

  const getExtraInfo = ({}) => {};

  useEffect(() => {
    clientAxios
      .get("/repos")
      .then(({ data }) => {
        setReposData(data);
        setDisplayRepo(data);
      })
      .catch((error) => {
        return <div>{error}</div>;
      });
    return () => {};
  }, []);

  return (
    <div className="">
      <div className="is-flex-direction-row buttons my-5">
        {Object.keys(languages).map((language) => (
          <Button
            title={language}
            onClickFn={onFilter}
            isActive={filterBy === language}
          />
        ))}
      </div>

      <hr />
      {displayRepo.map((repo) => (
        <Card {...repo} key={uid()} />
      ))}
    </div>
  );
};

export default ReposComponent;
