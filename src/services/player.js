import { post, get, del } from '../modules/axios';

const openGame = (data, callback) => post('/player/open-game', data, callback);
const getGameList = (data, callback) => get('/player/get-game-list', data, callback);

export { openGame, getGameList };
