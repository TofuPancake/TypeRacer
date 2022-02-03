import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import themeMusic from './sound/theme_music.mp3';

const AppContext = React.createContext();

function AppContextProvider({ children }) {
    const [firebaseUserIdToken, setFirebaseUserIdToken] = useState(null);
    const [username, setUsername] = useState('');
    const [lobbyid, setLobbyid] = useState('');
    const [lobby, setLobby] = useState(null);
    const audio = new Audio(themeMusic);
    audio.loop = true;
    audio.volume = 0.1;

    useEffect(() => {
        auth.onIdTokenChanged(async (auth) => {
            if (auth) {
                const token = await auth.getIdToken();
                setFirebaseUserIdToken(token);
            } else {
                setFirebaseUserIdToken(null);
            }
        });
    }, []);

    const context = {
        firebaseUserIdToken,
        username,
        setUsername,
        lobbyid,
        setLobbyid,
        lobby,
        setLobby,
        audio
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider,
}
