import { post, get, del } from '../modules/axios';

const openGame = (data, callback) => post('/player/open-game', data, callback);

export { openGame };
