import { ReactNode, useEffect ,useContext} from "react";
import { ContextConsumer } from "../utils/Context";


const PageWrapper = (props) => {

  const {appState,setAppState } = useContext(ContextConsumer);

  useEffect(() => {
    if (props.state) {
      setAppState(props.state);
    }
  }, [appState, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;