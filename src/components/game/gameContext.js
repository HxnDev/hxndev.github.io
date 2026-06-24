import { createContext, useContext } from 'react';

// Shared Play Mode state. Kept in a non-component module so React Fast Refresh
// stays happy (no component + hook mixed in one file).
export const GameContext = createContext({
  active: false,
  start: () => {},
  stop: () => {},
  toggle: () => {},
});

export const useGame = () => useContext(GameContext);
