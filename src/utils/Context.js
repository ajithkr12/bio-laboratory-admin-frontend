import React,{useState, useContext} from 'react'



const DataContext = React.createContext()

function  ContextProvider(props) {

    const [userData ,setUserData] = useState()
    const [sideMenuOpen , setSideMenuOpen, ] = useState(true);
    const [menuBarOpen , setMenuBarOpen ] = useState(false)
    const [appState,setAppState] = useState();
    const [mainPage, setMainPage ] = useState();
    const [megaMenu, setMegaMenu] = useState({
        list:[],
        loaded:false
    })


    return (
        <DataContext.Provider value={{
            userData ,setUserData,
            sideMenuOpen , setSideMenuOpen,
            appState,setAppState,
            mainPage, setMainPage,
            megaMenu , setMegaMenu,
            menuBarOpen , setMenuBarOpen
        }}>

            {props.children}
        </DataContext.Provider>
    )

}

const ContextConsumer =DataContext  ;
export {ContextConsumer,ContextProvider}

