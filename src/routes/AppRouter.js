import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Table from "../pages/Landslide/Table";
import Graph from "../pages/Landslide/Graph";
import Landslide from "../pages/Landslide/Home";
import Flood from "../pages/Flood/Home";
import Wildfire from "../pages/Wildfire/Home";
import NepalMap from "../components/NepalMap";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/landslide" element={<Landslide />} />
      <Route path="/flood" element={<Flood />} />
      <Route path="/wildfire" element={<Wildfire />} />
      <Route path="/wildfire/map" element={<NepalMap />} />
      <Route path="/landslide/graph" element={<Graph />} />
      <Route path="/landslide/table" element={<Table />} />
    </Routes>
  );
};

export default AppRouter;
