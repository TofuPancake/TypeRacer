import { useState, useEffect } from 'react';

/**
 * A custom hook wrapping a call to useState() to provide a stateful value, along with a call to useEffect() which saves that value
 * to local storage.
 * Code adapted from SOFTENG 750 example16 https://gitlab.com/cs732-s1c/cs732-examples/-/blob/master/example-16-localstorage-02/src/useLocalStorage.js
 */
export function useLocalStorage(key, initialValue = null) {

    const [value, setValue] = useState(() => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue])

    return [value, setValue];

}