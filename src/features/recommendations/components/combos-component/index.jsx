import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Cog } from "~/features/core";
import { RecommendCombos } from "~/features/recommendations";
import { CombosGrid } from "~/features/recommendations";
import { TitleContainer } from "~/features/recommendations";


const selectToonOrgs = createSelector(
  [(state) => state.recommendations.toons.toonList],
  (toonList) => toonList.map((toon) => toon.active ? toon.organic : "")
);

export default function CombosComponent() {

  // build new recommend combos object
  const cogLevel = useSelector((state) => state.recommendations.cog.level);
  const cogV2 = useSelector((state) => state.recommendations.cog.isV2);
  const cogLured = useSelector((state) => state.recommendations.cog.lured);
  const cogTrapped = useSelector((state) => state.recommendations.cog.trapped);
  const cog = cogLevel && new Cog(cogLevel, cogV2, cogLured, cogTrapped);
  const numToons = useSelector((state) => state.recommendations.toons.toonList.filter(toon => toon.active).length);
  const toonOrgs = useSelector(selectToonOrgs);
  const comboType = useSelector((state) => state.recommendations.combos.type);
  const comboSort = useSelector((state) => state.recommendations.combos.sort);
  const gagFilters = useSelector((state) => state.recommendations.combos.filters);

  const recommendations = new RecommendCombos(
    cog,                              // cog params
    numToons, toonOrgs,               // toons params
    comboType, comboSort, gagFilters  // combo params
  );

  const numCells = recommendations.recCombos.length;
  const expanded = useSelector((state) => state.recommendations.combos.expanded);

  const [cellStates, setCellStates] = useState(new Array(numCells).fill(expanded));
  useEffect(() => {
    setCellStates(new Array(numCells).fill(expanded))
  }, [numCells, expanded]);

  return (
    <div>
      <TitleContainer
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      <CombosGrid
        recommendCombos={recommendations}
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
    </div>
  );
}
