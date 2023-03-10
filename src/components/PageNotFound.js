import React from "react";
import NoResults from "../assets/no-results.png";
import Asset from "./Asset";

const PageNotFound = () => {
  return (
    <div>
      <Asset
        src={NoResults}
        message={`Sorry, the page you are looking for does not exist!`}
      />
    </div>
  );
};

export default PageNotFound;