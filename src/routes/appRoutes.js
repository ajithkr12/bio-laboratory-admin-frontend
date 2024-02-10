import Research from '../screens/Research';
import Publication from "../screens/Publication";
import Members from "../screens/Members";
import Collaborator from "../screens/Collaborators";
import Gallery from "../screens/Gallery";
import Message from "../screens/Message";
import { AiFillHome } from "react-icons/ai";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { GiTeamIdea } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { RiGalleryFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";


const appRoutes= [

  // {
  //   path: "/",
  //   element: <Home />,
  //   state: "home",
  //   sidebarProps: {
  //     displayText: "Home",
  //     icon: <AiFillHome style={{fontSize:'22px'}}/>
  //   }
  // },


  {
    path: "/research",
    element: <Research />,
    state: "research",
    sidebarProps: {
      displayText: "Research",
      icon: <MdFindInPage style={{fontSize:'22px'}}/>
    }
  },


  {
    path: "/publication",
    element: <Publication />,
    state: "publication",
    sidebarProps: {
      displayText: "Publication",
      icon: <HiClipboardDocumentList style={{fontSize:'22px'}}/>
    }
  },
  {
    path: "/collaborator",
    element: <Collaborator />,
    state: "collaborator",
    sidebarProps: {
      displayText: "Collaborators",
      icon: <GiTeamIdea style={{fontSize:'22px'}}/>
    }
  },

  {
    path: "/members",
    element: <Members />,
    state: "members",
    sidebarProps: {
      displayText: "Members",
      icon: <RiTeamFill style={{fontSize:'22px'}}/>
    }
  },
  {
    path: "/gallery",
    element: <Gallery />,
    state: "gallery",
    sidebarProps: {
      displayText: "Gallary",
      icon: <RiGalleryFill style={{fontSize:'22px'}}/>
    }
  },
  {
    path: "/message",
    element: <Message />,
    state: "message",
    sidebarProps: {
      displayText: "Messages",
      icon: <MdMessage style={{fontSize:'22px'}}/>
    }
  },
];

export default appRoutes;