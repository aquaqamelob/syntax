import path from 'path';
import fs from 'fs';
import { SlashCommandFile, ContextMenuCommandFile } from './types';
import { isJsOrTsFile } from './utils/lib';

export const slashCommands = fs
  .readdirSync(path.resolve(__dirname, './commands/slash'))
  .filter(isJsOrTsFile)
  .map((file) => {
    const { command } =
      require(`./commands/slash/${file}`) as SlashCommandFile;
    return command;
  });

export const contextMenuCommands = fs
  .readdirSync(path.resolve(__dirname, './commands/context'))
  .filter(isJsOrTsFile)
  .map((file) => {
    const { command } =
      require(`./commands/context/${file}`) as ContextMenuCommandFile;
    return command;
  });

export const allCommands = () => {
  return [...slashCommands, ...contextMenuCommands];
};