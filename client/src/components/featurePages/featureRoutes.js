import React from "react";
import { Route } from "react-router-dom";
import { CrimpPage, SloperPage, JugPage, PinchPage, PocketPage, UnderclingPage, SidepullPage, GastonPage, HeelHookPage, ToeHookPage, MantlePage, OverHangPage, SlabPage, DynoPage, FeaturesList } from "./featuresIndex.js"

const getFeatureRoutes = () => {
  return [
    <Route exact path="/features" key={"/features"} component={FeaturesList} />,
    <Route exact path="/features/crimp" key={"/features/crimp"} component={CrimpPage} />,
    <Route exact path="/features/sloper" key={"/features/sloper"} component={SloperPage} />,
    <Route exact path="/features/jug" key={"/features/jug"} component={JugPage} />,
    <Route exact path="/features/pinch" key={"/features/pinch"} component={PinchPage} />,
    <Route exact path="/features/pocket" key={"/features/pocket"} component={PocketPage} />,
    <Route
      exact path="/features/undercling"
      key={"/features/undercling"}
      component={UnderclingPage}
    />,
    <Route exact path="/features/side-pull" key={"/features/side-pull"} component={SidepullPage} />,
    <Route exact path="/features/gaston" key={"/features/gaston"} component={GastonPage} />,
    <Route exact path="/features/heel-hook" key={"/features/heel-hook"} component={HeelHookPage} />,
    <Route exact path="/features/toe-hook" key={"/features/toe-hook"} component={ToeHookPage} />,
    <Route exact path="/features/mantle" key={"/features/mantle"} component={MantlePage} />,
    <Route exact path="/features/overhang" key={"/features/overhang"} component={OverHangPage} />,
    <Route exact path="/features/slab" key={"/features/slab"} component={SlabPage} />,
    <Route exact path="/features/dyno" key={"/features/dyno"} component={DynoPage} />,
  ]
}

export default getFeatureRoutes