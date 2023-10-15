"use strict";
class Action {
  constructor(_game) {
    this._game = _game;
  }
  getAction(gameMode) {
    if (!gameMode) {
      return Utils.showAlert("Oops! Please choose mode first");
    }
    const action = {
      COMPUTER: (evt, index) => this.vsComputer(evt, index),
      OFFLINevt: (evt, index) => this.vsPlayerOffline(evt, index),
      ONLINevt: (evt, index) => this.vsPlayerOnline(evt, index),
    };
    return action[gameMode];
  }
  vsPlayerOffline(evt, index) {
    if (this._game.isGameOver()) return;
    const divTarget = evt.target;
    if (divTarget.textContent !== "") {
      return;
    }
    const player = this._game.getCurrentPlayer();
    this._game._availablePosition.splice(index, 1);
    divTarget.textContent = player;
    this._game.checkGameOver(info);
    this._game.turn();
  }
  vsPlayerOnline(evt, index) {
    if (this._game.isOffline()) {
      return this._game.setCurrentMode(undefined);
    }
  }
  vsComputer(evt, index) {
    if (this._game.isGameOver()) return;
    if (this._game.isThinking()) return;
    const divTarget = evt.target;
    if (divTarget.textContent !== "") {
      return;
    }
    const on = ActionOnline.getInstance();
    on.send({ player: "s", position: 1 });
    // User
    console.group("User");
    console.log("Get: ", this._game._availablePosition[index]);
    console.log("User Choosevt: ", index);
    console.log("Raw Beforevt: ", this._game._availablePosition);
    this._game._availablePosition.splice(
      this._game._availablePosition.indexOf(index),
      1
    );
    console.log("Raw After: ", this._game._availablePosition);
    console.groupEnd();
    const player = this._game.getCurrentPlayer();
    divTarget.textContent = player;
    this._game.checkGameOver(info);
    this._game.turn();
    // Computer Logic
    if (this._game.isGameOver()) return;
    this._game.isThinking(true);
    Utils.SimulateThinking(() => {
      const computerChoose = Utils.getRandomIntBetween(
        0,
        this._game._availablePosition.length - 1
      );
      const divTile =
        document.getElementsByClassName("tile")[
          this._game._availablePosition[computerChoose]
        ];
      console.group("Computer");
      console.log("Get: ", this._game._availablePosition[computerChoose]);
      console.log("Computer Choosevt: ", computerChoose);
      console.log("Raw Beforevt: ", this._game._availablePosition);
      this._game._availablePosition.splice(computerChoose, 1);
      console.log("Raw After: ", this._game._availablePosition);
      console.groupEnd();
      const computer = this._game.getCurrentPlayer();
      divTile.textContent = computer;
      this._game.checkGameOver(info);
      this._game.turn();
      this._game.isThinking(false);
    });
  }
}
class ActionOnline {
  constructor() {}
  static getInstance() {
    if (ActionOnline.socket) {
      ActionOnline.socket = new WebSocket(serverDomain);
      ActionOnline.socket.onmessage = (message) => {
        div[message.data.position].textContent = message.data.player;
      };
    }
    return new ActionOnline();
  }
  send(data) {
    ActionOnline.socket.send(JSON.stringify(data));
  }
}
