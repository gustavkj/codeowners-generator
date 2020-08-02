import { getCustomConfiguration } from './getCustomConfiguration';

interface GlobalOptions {
  includes?: string[];
}
export interface Command {
  parent: GlobalOptions;
}

const makeArray = (field: unknown) => (field && Array.isArray(field) ? field : [field].filter(Boolean));

const getOptionsFromCommand = (command: Command): Partial<GlobalOptions> => {
  const {
    parent: { includes },
  } = command;

  return { includes: makeArray(includes) };
};

export const getGlobalOptions = async (command: Command): Promise<GlobalOptions> => {
  const options = getOptionsFromCommand(command);

  const customConfiguration = await getCustomConfiguration();

  return { ...customConfiguration, ...options };
};
