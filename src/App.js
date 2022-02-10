import React, { useEffect, useState, useRef, useCallback } from "react";
import ResizePanel from "react-resize-panel";
import axios from "axios";
import styled from "styled-components";
import XLSX from "xlsx";

import "./App.css";
import ServiceTitle from "./components/ServiceTitle";
import MapComponent from "./components/MapComponent";
import FavoriteSpots from "./components/FavoriteSpots";
import Modal from "./components/Modal";
import SelectComponent from "./components/SelectComponent";
import FileUploader from "./components/FileUploader";
import AppleOrPearToggleButton from "./components/AppleOrPearTobbleButton";
import stations from "./data/station.json";
import fbSpots from "./data/fireblightSpots.json";
import provinces from "./data/provinceData.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // background-color: #2c2f38;
  background-color: #f1dfdf;
  color: #292929;
`;

const NavWrapper = styled.div`
  width: 100%;
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
  // background-color: rgb(0, 6, 18);
  // background-color: #91a9d5;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
`;

const Selector = styled.select``;

const Button = styled.button`
  cursor: pointer;
  background-color: #2940d3;
  color: white;
  font-weight: 600;
  border: none;
  width: 150px;
  height: 100%;
  border-radius: 5px;
  text-align: center;
  line-height: 25px;
  margin-left: 5px;
`;

const LeftContentsWrapper = styled.div`
  width: 100%;
`;

const RightContentsWrapper = styled.div`
  box-sizing: border-box;
  padding-left: 10px;
  height: 100%;
`;

function App() {
  const [selectedYear, setSelectedYear] = useState({
    id: 2021,
    value: 2021,
    name: "2021년",
  });
  const [selectedFruit, setSelectedFruit] = useState({
    id: "apple",
    value: "apple",
    name: "사과",
  });
  const [selectedProvince, setSelectedProvince] = useState({ ...provinces[0] });
  const [selectedSpots, setSelectedSpots] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [fireblightSpots, setFireblightSpots] = useState([]);
  const [stationsData, setStationsData] = useState([]);
  const [totalStations, setTotalStations] = useState([]);
  const [stationSpots, setStationSpots] = useState([]);
  const [mapWidth, setMapWidth] = useState(500);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ x: 500, y: 300 });

  const mapComponentRef = React.createRef();

  // const getFBStatus = (data) => {
  //   let result = 0;
  //   for (const item of data) {
  //     if (item.bbs | item.cms | item.cbs | item.sbs) {
  //       result = 5;
  //       break;
  //     }
  //     if (item.bir & (item.bir > result)) {
  //       result = item.bir;
  //     }
  //   }
  //   return result;
  // };

  // const GetFBSpotData = async (station, selectedYear, selectedFruit) => {
  //   const begin = `${selectedYear}-01-01`;
  //   const until = `${selectedYear}-12-31`;
  //   await axios
  //     .get(
  //       `https://fireblight.org/fireblight/getListMaryblyts?begin=${begin}&until=${until}&plant=${selectedFruit}&lon=${station.lon}&lat=${station.lat}&format=json`
  //       // "https://fireblight.org/fireblight/getListMaryblyts?begin=2021-04-10&until=2021-04-10&plant=apple&lon=127.7669&lat=35.9078&format=json"
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       // 전체 데이터중 가장 높은 꽃감염위험도 추출
  //       let stationBirs = [];
  //       let fbStatus = getFBStatus(data);
  //       let maxBir = 0;
  //       stationBirs = data.filter((item) => item.bir != null);
  //       if (stationBirs.length > 0) {
  //         maxBir = Math.max(
  //           ...data.filter((item) => item.bir != null).map((item) => item.bir)
  //         );
  //       }
  //       let newStation = {
  //         ...station,
  //         fbStatus: fbStatus,
  //         maxBir: maxBir,
  //       };
  //       const currentData = stationSpots;
  //       currentData.push(newStation);
  //       setStationSpots([...currentData]);
  //     });
  // };

  const updateTotalStations = async (selectedYear, selectedFruit) => {
    const begin = `${selectedYear}-01-01`;
    const until = `${selectedYear}-12-31`;
    await axios
      .get(
        `https://fireblight.org/fireblight/getMaryblyts?year=${selectedYear.value}&plant=${selectedFruit.value}`
        // "https://fireblight.org/fireblight/getListMaryblyts?begin=2021-04-10&until=2021-04-10&plant=apple&lon=127.7669&lat=35.9078&format=json"
      )
      .then((response) => {
        const data = response.data;
        const result = data.map((item) => {
          const coords = item.coords.split(",");
          return {
            id: item.st_id,
            code: item.code,
            name: item.name,
            type: item.type,
            lon: parseFloat(coords[0]),
            lat: parseFloat(coords[1]),
            fbStatus: item.status,
            latestDate: item.recent_tm,
          };
        });
        setTotalStations(result);
      });
  };

  const onChangeSize = () => {
    console.log("onChangeSize");
  };

  useEffect(() => {
    stations.map((station) => {
      updateTotalStations(selectedYear, selectedFruit);
    });
  }, [selectedYear, selectedFruit]);

  return (
    <Wrapper>
      <NavWrapper>
        <ServiceTitle />
        <MenuWrapper>
          <SelectComponent
            selectedOption={selectedFruit}
            onChangeOption={setSelectedFruit}
            options={[
              { id: "apple", value: "apple", name: "사과" },
              { id: "pear", value: "pear", name: "배" },
            ]}
          />
          <SelectComponent
            selectedOption={selectedYear}
            onChangeOption={setSelectedYear}
            options={[
              { id: 2021, value: 2021, name: "2021년" },
              { id: 2022, value: 2022, name: "2022년" },
            ]}
          />
          <SelectComponent
            selectedOption={selectedProvince.id}
            onChangeOption={setSelectedProvince}
            options={provinces}
          />
          {/* <Button onClick={openModal}>화상병 발생 지점 등록</Button> */}
          {modalVisible && (
            <Modal
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeModal}
            >
              <FileUploader
                updateFireblightSpots={setFireblightSpots}
                onClose={closeModal}
              />
            </Modal>
          )}
        </MenuWrapper>
      </NavWrapper>
      <ContentsWrapper>
        <LeftContentsWrapper>
          <MapComponent
            spots={totalStations}
            fireblightSpots={fireblightSpots}
            selectedSpots={selectedSpots}
            addSelectedSpots={setSelectedSpots}
            selectedProvince={selectedProvince}
          />
        </LeftContentsWrapper>
        <RightContentsWrapper>
          <ResizePanel
            direction="w"
            style={{ minWidth: "250px", width: "100%", height: "100%" }}
          >
            <FavoriteSpots
              selectedYear={selectedYear}
              selectedFruit={selectedFruit}
              spots={selectedSpots}
              setSelectedSpots={setSelectedSpots}
            />
          </ResizePanel>
        </RightContentsWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;
