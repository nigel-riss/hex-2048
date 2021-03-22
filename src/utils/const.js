const GAME_FIELD_WIDTH = 560;
const FONT_SIZE_RATIO = 70;

const Servers = {
  'localhost': {
    url: `http://localhost:13337`,
    title: `Local Server`,
  },
  'remote': {
    url: `//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud`,
    title: `Remote Server`,
  },
};

const DEFAULT_SERVER = `localhost`;


export {
  FONT_SIZE_RATIO,
  GAME_FIELD_WIDTH,
  Servers,
  DEFAULT_SERVER,
};
