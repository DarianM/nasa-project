import {
  useState,
} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import {
  Frame,
  withStyles,
} from "arwes";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Centered from "../components/Centered";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

const styles = () => ({
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "auto",
  },
  centered: {
    flex: 1,
    paddingTop: "20px",
    paddingBottom: "10px",
  },
});

const AppLayout = props => {
  const { classes } = props;

  const [frameVisible, setFrameVisible] = useState(true);
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches();

  const planets = usePlanets();
  
  return <div className={classes.content}>
    <Header onNav={animateFrame} />
    <Centered className={classes.centered}>
      <Frame animate 
        show={frameVisible} 
        corners={4} 
        style={{visibility: frameVisible ? "visible" : "hidden"}}>
        {anim => (
          <div style={{padding: "20px"}}>
          <Routes>
            <Route exact path="/" element={
              <Launch 
                entered={anim.entered}
                planets={planets}
                submitLaunch={submitLaunch}
                isPendingLaunch={isPendingLaunch} />} />
            <Route exact path="/launch" element={
              <Launch
                entered={anim.entered}
                planets={planets}
                submitLaunch={submitLaunch}
                isPendingLaunch={isPendingLaunch} />} />
            <Route exact path="/upcoming" element={
              <Upcoming
              entered={anim.entered}
              launches={launches}
              abortLaunch={abortLaunch} />
            } />
            <Route exact path="/history" element={
              <History entered={anim.entered} launches={launches} />
            } />
          </Routes>
          </div>
        )}
      </Frame>
    </Centered>
    <Footer />
  </div>;
};

export default withStyles(styles)(AppLayout);