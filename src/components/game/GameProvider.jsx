import { useCallback, useMemo, useState } from 'react';
import { GameContext } from '@/components/game/gameContext';

export default function GameProvider({ children }) {
  const [active, setActive] = useState(false);

  const start = useCallback(() => setActive(true), []);
  const stop = useCallback(() => setActive(false), []);
  const toggle = useCallback(() => setActive(a => !a), []);

  const value = useMemo(() => ({ active, start, stop, toggle }), [active, start, stop, toggle]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
