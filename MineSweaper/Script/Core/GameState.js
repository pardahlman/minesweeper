var GameState;
(function (GameState) {
    GameState[GameState["NotStarted"] = 0] = "NotStarted";
    GameState[GameState["Ready"] = 1] = "Ready";
    GameState[GameState["Ongoing"] = 2] = "Ongoing";
    GameState[GameState["Finnished"] = 3] = "Finnished";
})(GameState || (GameState = {}));
