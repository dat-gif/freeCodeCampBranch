import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { clientAxios } from "../util/axios";
import Card from "./Card";
import { ReposEnum } from "../constants/repo";
import Button from "./Button";
import axios from "axios";

const ReposComponent = () => {
  const [reposData, setReposData] = useState([]);
  const [displayRepo, setDisplayRepo] = useState([]);
  const [filterBy, setFilterBy] = useState("All");

  // create list of program language
  const languages = { All: "All" };
  reposData.forEach((repo) => {
    languages[`${repo.language}`] = repo.language;
  });
  delete languages[null];
  languages[ReposEnum.NONE_LANG] = null;

  const onFilter = (lang) => {
    setFilterBy((prev) => {
      return lang === ReposEnum.NONE_LANG
        ? ReposEnum.NONE_LANG
        : languages[lang];
    });
    if (lang === "All") {
      setDisplayRepo(reposData);
      return;
    }
    setDisplayRepo(
      reposData.filter((repo) => repo.language === languages[lang])
    );
  };

  //
  const getExtraInfo = async ({ url, index }) => {
    if (displayRepo[index].hasOwnProperty(ReposEnum.EXTRA_INFO)) {
      return;
    }
    const updateRepoData = [...displayRepo];
    updateRepoData[index][ReposEnum.EXTRA_INFO] = await axios
      .get(`${url}/commits`)
      .then(({ data }) => {
        return {
          author: data[0].commit.author.name,
          date: data[0].commit.author.date,
          message: data[0].commit.message,
        };
      })
      .catch((error) => {
        return {
          code: error.code,
          error: "Error when retrieving latest commit.",
        };
      });
    setDisplayRepo(updateRepoData);
  };

  useEffect(() => {
    clientAxios
      .get("/repos")
      .then(({ data }) => {
        setReposData(data);
        setDisplayRepo(data);
      })
      .catch((error) => {
        return (
          <div>
            <p>Opps, got error, please try later...</p>
          </div>
        );
      });
  }, []);

  return (
    <div className="px-6 pt-3">
      <div className="is-flex-direction-row buttons my-5">
        {Object.keys(languages).map((language) => (
          <Button
            title={language}
            onClickFn={onFilter}
            isActive={filterBy === language}
            key={uid()}
          />
        ))}
      </div>

      <hr />
      <div className="fixed-grid has-1-cols-mobile">
        <div className="grid is-gap-3">
          {displayRepo.map((repo, index) => (
            <div className="cell">
              <Card
                {...repo}
                key={repo.id}
                index={index}
                onPromiseClickFn={getExtraInfo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReposComponent;
