import React from "react"

export const contextPrototype = {
    user: {},
    userSave: {},
    setUser: () => {},
    setUserSave: () => {}
}

export const UserContext = React.createContext(contextPrototype)