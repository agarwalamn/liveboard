import {
  animals,
  colors,
  Config,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const config: Config = {
  dictionaries: [colors, animals],
  separator: '-',
};

export const generateRandomRoomName = () => {
  const characterName: string = uniqueNamesGenerator(config);
  return characterName;
};
