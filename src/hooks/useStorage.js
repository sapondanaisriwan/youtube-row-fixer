import { useEffect, useRef, useState } from "react";
import { getStorage, setStorage } from "../utils/browserStorage";

export const useStorageState = (storageKey) => {
  const [state, setState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getInitialStorageState = async () => {
    try {
      const savedSetting = await getStorage(storageKey);
      if (savedSetting !== undefined) {
        setState(savedSetting);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoaded(true);
    }
  };

  const updateStorage = async () => {
    try {
      await setStorage({ [storageKey]: state });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getInitialStorageState();
  }, [storageKey]);

  const prevStorageState = useRef(state);

  useEffect(() => {
    if (prevStorageState.current !== state) {
      updateStorage();
    }

    prevStorageState.current = state;
  }, [storageKey, state]);

  return [state, setState, isLoaded];
};
