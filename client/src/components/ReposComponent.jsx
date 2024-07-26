import React, { useEffect, useState } from "react";
import { clientAxios } from "../util/axios";
import Card from "./Card";
import { ReposEnum } from "../constants/repo";
import Button from "./Button";
import { uid } from "uid";
import axios from "axios";

const ReposComponent = () => {
  const [reposData, setReposData] = useState([]);
  const [displayRepo, setDisplayRepo] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [expandInfo, setExpandInfo] = useState({});

  const languages = {};
  reposData.forEach((repo) => {
    languages[`${repo.language}`] = repo.language;
  });
  delete languages[null];
  languages[ReposEnum.NONE_LANG] = null;

  const onFilter = (lang) => {
    setDisplayRepo(
      reposData.filter((repo) => repo.language === languages[lang])
    );
    setFilterBy(languages[lang]);
  };

  // const getExtraInfo = async ({ url, index }) => {
  //   const commitInfo = await axios.get(`${url}/commits`).then(({ data }) => ({
  //     author: data[0].commit.author.name,
  //     date: data[0].commit.author.date,
  //     message: data[0].commit.message,
  //   }));
  //   return commitInfo;
  // };

  const getExtraInfo = async ({ url, index }) => {
    if (reposData[index].hasOwnProperty(ReposEnum.EXTRA_INFO)) {
      return;
    }
    reposData[index][ReposEnum.EXTRA_INFO] = await axios
      .get(`${url}/commits`)
      .then(({ data }) => ({
        author: data[0].commit.author.name,
        date: data[0].commit.author.date,
        message: data[0].commit.message,
      }));
    setReposData([...reposData]);
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
      {displayRepo.map((repo, index) => (
        <Card
          {...repo}
          key={repo.id}
          index={index}
          onPromiseClickFn={getExtraInfo}
        />
      ))}
    </div>
  );
};

export default ReposComponent;
