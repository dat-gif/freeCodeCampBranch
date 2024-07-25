import React from "react";

const Card = ({ name, description, language, forks, created_at }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <p>{language}</p>
      <p>{forks}</p>
      <p>{created_at}</p>
      <hr />
    </div>
  );
};

export default Card;
