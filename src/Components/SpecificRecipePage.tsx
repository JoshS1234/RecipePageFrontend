import React from "react";
import { useParams } from "react-router-dom";

const SpecificRecipePage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>SpecificRecipePage</div>;
};

export default SpecificRecipePage;
