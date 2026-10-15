(function(root){
  "use strict";
  function normalizeScore(value){
    const number=Number(value);
    if(!Number.isFinite(number)||number<0)throw new RangeError("Score must be a finite non-negative number");
    return Math.floor(number);
  }
  function applyWinnerScore(scores,winnerId){
    if(!winnerId||!Object.prototype.hasOwnProperty.call(scores,winnerId))throw new Error("Winner must exist in the score map");
    return Object.fromEntries(Object.keys(scores).map(id=>[id,id===winnerId?normalizeScore(scores[id]):0]));
  }
  function recalculateTotal(rounds,playerId){
    return rounds.reduce((sum,round)=>sum+Math.max(0,Number(round.scores&&round.scores[playerId])||0),0);
  }
  function validateScores(scores,playerIds){
    return Array.isArray(playerIds)&&playerIds.length>=2&&playerIds.every(id=>Number.isFinite(Number(scores[id]))&&Number(scores[id])>=0);
  }
  const api={normalizeScore,applyWinnerScore,recalculateTotal,validateScores};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.DominoScoreUtils=api;
})(typeof window!=="undefined"?window:globalThis);
