import React, {createContext, useContext, useMemo, useState, useEffect} from 'react';
import firebase from "../../firebase/config";
import "firebase/auth";
import "firebase/database";

export const Context = createContext(null);

export default function ContextProvider({children})
{
    const [authState, setAuthState] = useState({user: null, loggedIn: false})

    const providerValue = useMemo(() => ({authState, setAuthState}), [authState, setAuthState])

    useEffect(() => {

        return firebase.auth().onIdTokenChanged(async user => {

          if (user) {
              setAuthState({ loggedIn: true, user: user});
            } else {
            setAuthState({ loggedIn: false, user: null});
          }
        })
      }, []);



    return (
        <Context.Provider value = {providerValue}>
            {children}
        </Context.Provider>
    )
}