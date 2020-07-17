import React from "react";
import { Helmet } from "react-helmet";
import SpeciesList from "../../components/SpeciesList";
import { useSelector } from "react-redux";

function SpeciesPage(props) {
  const { selectedSpecies } = props.match.params;
  const species = useSelector((state: any) => state.species.data);
  return (
    <div>
      <Helmet>
        <title>Species</title>
      </Helmet>
      <SpeciesList species={species} selectedSpecies={selectedSpecies} />
    </div>
  );
}

export default SpeciesPage;
