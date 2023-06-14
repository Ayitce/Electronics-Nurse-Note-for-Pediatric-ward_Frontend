import { createContext, useContext, useState } from "react";

interface IControlContext {
    userType: string,
    setUserType(name: string): void
}

const ControlContext = createContext<IControlContext>({
    userType: "",
    setUserType: () => { }
})

interface ControlContextProviderProps {
    children: any
}

export const ControlContextProvider = (props: ControlContextProviderProps) => {
    
    const [userType, setUserType] = useState<string>("")
    
    return (
        <ControlContext.Provider value={{
            userType: userType,
            setUserType: setUserType
        }}>
            {props.children}
        </ControlContext.Provider>
    )
}

export const useControlContext = () => useContext(ControlContext)