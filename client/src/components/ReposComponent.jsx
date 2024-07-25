import React, { useEffect, useState } from "react";
import { clientAxios } from "../util/axios";

const ReposComponent = () => {
  const [reposData, setReposData] = useState({ a: "hi" });

  useEffect(() => {
    clientAxios
      .get("/repos")
      .then((result) => {
        setReposData(result);
      })
      .catch((error) => {
        return <div>{error}</div>;
      });
    return () => {};
  }, []);

  return <div>{JSON.stringify(reposData)}</div>;
};

export default ReposComponent;
