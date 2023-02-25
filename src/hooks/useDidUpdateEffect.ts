import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useDidUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return effect();
    didMountRef.current = true;
  }, deps);
};
