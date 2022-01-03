import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import XLSX from "xlsx";

import "./App.css";
import ServiceTitle from "./components/ServiceTitle";
import MapComponent from "./components/MapComponent";
import FavoriteSpots from "./components/FavoriteSpots";
import AppleOrPearToggleButton from "./components/AppleOrPearTobbleButton";
import SelectComponent from "./components/SelectComponent";
import stations from "./data/station.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
`;

const Selector = styled.select``;

const Button = styled.button`
  background-color: orange;
  border: none;
  width: 150px;
`;

const MapComponentWrapper = styled.div`
  width: 50%;
`;

function App() {
  const [isInit, setIsInit] = useState(false);
  const [fbSpots, setFbSpots] = useState({});
  const begin = "2021-04-01";
  const today = new Date().toISOString().split("T")[0];
  const GetFBSpotData = async (station) => {
    await axios
      .get(
        `https://fireblight.org/fireblight/getListMaryblyts?begin=${begin}&until=${begin}&plant=apple&lon=${station.lon}&lat=${station.lat}&format=json`
        // "https://fireblight.org/fireblight/getListMaryblyts?begin=2021-04-10&until=2021-04-10&plant=apple&lon=127.7669&lat=35.9078&format=json"
      )
      .then((response) => {
        const data = response.data;
      });
  };

  if (!isInit) {
    stations.map((station) => {
      GetFBSpotData(station);
    });
  }

  return (
    <Wrapper>
      <NavWrapper>
        <ServiceTitle />
        <MenuWrapper>
          <AppleOrPearToggleButton />
          <SelectComponent options={[2022, 2021]} />
          <Button>화상병 발생 지점 등록</Button>
        </MenuWrapper>
      </NavWrapper>
      <ContentsWrapper>
        <MapComponentWrapper>
          <MapComponent spots={stations} />
        </MapComponentWrapper>
        <FavoriteSpots spots={stations.slice(1, 5)} />
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;
