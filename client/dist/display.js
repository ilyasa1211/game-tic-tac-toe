"use strict";
class Display {
    render(...drawables) {
        drawables.forEach((drawable) => drawable.draw());
    }
    refresh(...refreshables) {
        refreshables.forEach((refreshable) => refreshable.refresh());
    }
}
