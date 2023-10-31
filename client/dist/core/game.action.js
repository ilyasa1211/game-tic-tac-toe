"use strict";
class GameAction {
    execute(evt, index, game) {
        if (typeof this._action === "undefined") {
            throw new InformationalMessage("Please set action");
        }
        this._action.execute(evt, index, game);
    }
    setAction(action) {
        this._action = action;
        throw new ResultMessage(action.label);
    }
}
