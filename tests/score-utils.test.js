const test = require("node:test");
const assert = require("node:assert/strict");
const ScoreUtils = require("../score-utils.js");

test("normalizes valid score values to non-negative integers", () => {
  assert.equal(ScoreUtils.normalizeScore("12.9"), 12);
  assert.equal(ScoreUtils.normalizeScore(0), 0);
});
test("rejects invalid or negative scores", () => {
  assert.throws(() => ScoreUtils.normalizeScore(-1), RangeError);
  assert.throws(() => ScoreUtils.normalizeScore("not a number"), RangeError);
});
test("winner mode assigns points only to the selected winner", () => {
  assert.deepEqual(ScoreUtils.applyWinnerScore({a: 18, b: 7, c: 0}, "b"), {a: 0, b: 7, c: 0});
});
test("winner must be present in the score map", () => {
  assert.throws(() => ScoreUtils.applyWinnerScore({a: 1}, "missing"), /Winner must exist/);
});
test("recalculates totals from rounds, supporting undo without stale totals", () => {
  const rounds = [{scores:{a:10,b:0}},{scores:{a:5,b:20}}];
  assert.equal(ScoreUtils.recalculateTotal(rounds, "a"), 15);
  assert.equal(ScoreUtils.recalculateTotal(rounds.slice(0,1), "b"), 0);
});
test("validates score maps for at least two players", () => {
  assert.equal(ScoreUtils.validateScores({a:2,b:0}, ["a","b"]), true);
  assert.equal(ScoreUtils.validateScores({a:-1,b:0}, ["a","b"]), false);
  assert.equal(ScoreUtils.validateScores({a:2}, ["a"]), false);
});
