import React, { useEffect, useState } from "react";
import { clientAxios } from "../util/axios";
import Card from "./Card";
import { Languages } from "../constants/repo";
import Button from "./Button";
import { uid } from "uid";
import axios from "axios";

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

  const getExtraInfo = async ({ commits_url, comments_url }) => {
    const commitInfo = await axios
      .get("https://api.github.com/repos/freeCodeCamp/.github/commits")
      .then(({ data }) => {
        const commitInfo = data[0];
        return {
          author: commitInfo.commit.author.name,
          date: commitInfo.commit.author.date,
          message: commitInfo.commit.message,
        };
      });
  };

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
        <Card {...repo} key={uid()} onClickFn={getExtraInfo} />
      ))}
    </div>
  );
};

export default ReposComponent;
