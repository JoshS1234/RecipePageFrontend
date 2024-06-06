import React from "react";
import { useParams } from "react-router-dom";

const SpecificRecipePage = () => {
  const { id } = useParams();
  return <div>SpecificRecipePage</div>;
};

export default SpecificRecipePage;
