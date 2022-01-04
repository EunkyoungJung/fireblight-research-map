import React, { useEffect, useState } from "react";
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
import fbSpots from "./data/fireblightSpots.json";

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

const LeftContentsWrapper = styled.div`
  width: 500px;
`;

const RightContentsWrapper = styled.div`
  width: 80%;
  box-sizing: border-box;
  padding-left: 10px;
`;

function App() {
  const [fireblightSpots, setFireblightSpots] = useState(fbSpots);
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

  useEffect(() => {
    stations.map((station) => {
      GetFBSpotData(station);
    });
  }, [stations, fireblightSpots]);

  return (
    <Wrapper>
      <NavWrapper>
        <ServiceTitle />
        <MenuWrapper>
          <SelectComponent options={["사과", "배"]} />
          <SelectComponent options={[2022, 2021]} />
          <Button>화상병 발생 지점 등록</Button>
        </MenuWrapper>
      </NavWrapper>
      <ContentsWrapper>
        <LeftContentsWrapper>
          <MapComponent spots={stations} fireblightSpots={fireblightSpots} />
        </LeftContentsWrapper>
        <RightContentsWrapper>
          <FavoriteSpots spots={stations.slice(1, 5)} />
        </RightContentsWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;
