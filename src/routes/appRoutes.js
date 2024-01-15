
import Home from "../screens/Home";
import Research from '../screens/Research';
import Publication from "../screens/Publication";
import Members from "../screens/Members";
import Collaborator from "../screens/Collaborators";
import Gallery from "../screens/Gallery";

import { AiFillHome } from "react-icons/ai";


const appRoutes= [

  {
    path: "/home",
    element: <Home />,
    state: "home",
    sidebarProps: {
      displayText: "Home",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },


  {
    path: "/research",
    element: <Research />,
    state: "research",
    sidebarProps: {
      displayText: "Research #",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },


  {
    path: "/publication",
    element: <Publication />,
    state: "publication",
    sidebarProps: {
      displayText: "Publication #",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },
  {
    path: "/collaborator",
    element: <Collaborator />,
    state: "collaborator",
    sidebarProps: {
      displayText: "Collaborators #",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },

  {
    path: "/members",
    element: <Members />,
    state: "members",
    sidebarProps: {
      displayText: "Members #",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },
  {
    path: "/gallery",
    element: <Gallery />,
    state: "gallery",
    sidebarProps: {
      displayText: "Gallary #",
      icon: <AiFillHome style={{fontSize:'22px'}}/>
    }
  },
];

export default appRoutes;