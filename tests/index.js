var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Player_select, _Player_onSelect, _SelectedPlayer_instances, _SelectedPlayer_delegate, _SelectedPlayer_onSelect;
import { Delegate, WeakenedSet } from '../code/index.js';
class Player {
    constructor(name) {
        this.name = name;
        _Player_select.set(this, new Set());
        _Player_onSelect.set(this, new WeakenedSet(__classPrivateFieldGet(this, _Player_select, "f")));
    }
    get onSelect() {
        return __classPrivateFieldGet(this, _Player_onSelect, "f");
    }
    select() {
        __classPrivateFieldGet(this, _Player_select, "f").forEach(e => e());
    }
}
_Player_select = new WeakMap(), _Player_onSelect = new WeakMap();
class SelectedPlayer extends Player {
    constructor(...players) {
        super('');
        _SelectedPlayer_instances.add(this);
        _SelectedPlayer_delegate.set(this, Delegate());
        players.forEach(__classPrivateFieldGet(this, _SelectedPlayer_instances, "m", _SelectedPlayer_onSelect).bind(this));
        return __classPrivateFieldGet(this, _SelectedPlayer_delegate, "f").call(this, this);
    }
}
_SelectedPlayer_delegate = new WeakMap(), _SelectedPlayer_instances = new WeakSet(), _SelectedPlayer_onSelect = function _SelectedPlayer_onSelect(player) {
    const select = () => __classPrivateFieldGet(this, _SelectedPlayer_delegate, "f").call(this, player);
    player.onSelect.add(select);
};
const nikka = new Player('Nikka');
const wolf = new Player('Wolf');
const selected = new SelectedPlayer(nikka, wolf);
nikka.select();
console.log(selected.name);
wolf.select();
console.log(selected.name);
