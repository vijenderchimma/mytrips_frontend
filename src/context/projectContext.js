import React , {useState}from "react";
import App from "../App";

export const projectContext = React.createContext()

const Context = () =>{
    const [templeState,setTempleState] = useState()
    const [waterfallState,setWaterfallState] = useState()
    const [trekkingState,setTrekkingState] = useState()
    return(
        <projectContext.Provider value={{templeState,setTempleState,waterfallState,setWaterfallState,trekkingState,setTrekkingState}}>
            <App/>
        </projectContext.Provider>
    )
}
export default Context

