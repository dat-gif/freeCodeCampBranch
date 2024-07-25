import React, { useEffect, useState } from "react";
import { clientAxios } from "../util/axios";
import Card from "./Card";

const ReposComponent = () => {
  const [reposData, setReposData] = useState([]);

  useEffect(() => {
    clientAxios
      .get("/repos")
      .then(({ data }) => {
        setReposData(data);
      })
      .catch((error) => {
        return <div>{error}</div>;
      });
    return () => {};
  }, []);

  return (
    <div>
      {reposData.map((repo) => (
        <Card {...repo} />
      ))}
    </div>
  );
};

export default ReposComponent;
