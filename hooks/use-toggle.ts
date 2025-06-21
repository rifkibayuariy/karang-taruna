import { useState, useCallback } from "react";

/**
 *
 * @param initialState - (default: false)
 * @returns [state, setState, toggleFunction]
 */
export function useToggle(
  initialState: boolean = false
): [boolean, (stateManual: boolean) => void, () => void] {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setManual = useCallback(
    (stateManual: boolean) => setState(stateManual),
    []
  );
  return [state, setManual, toggle];
}
