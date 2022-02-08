import React, { useState } from "react";
import axios from "axios";

import { divIcon } from "leaflet";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  Marker,
  Tooltip,
  Popup,
  ScaleControl,
} from "react-leaflet";
import styled from "styled-components";

import "./MapContainer.css";
import FireblightSpotPopupInfo from "./FireblightSpotPopupInfo";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 900;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  z-index: 900;
  background-color: red;
  color: white;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`;

const getMarkerIcon = (color, title, isSelected) => {
  if (isSelected) {
    return `<div style="display: flex; align-items: center; justify-content: center; font-size:10px; color:white; background:${color}; 
    height:24px; border-radius:50%; border: 2px solid white; box-shadow: 1px 1px 1px #7C7C7C;">${title}<div/>`;
  }
  return `<div style="display: flex; align-items: center; justify-content: center; font-size:10px; color:white; background:${color}; 
    height:24px; border-radius:50%; box-shadow: 1px 1px 1px #7C7C7C;">${title}<div/>`;
};

const statusColors = {
  0: "#A5A5A5", // 꽃감염위험도 정보 없음 & 출현  정보 없음 (gray)
  1: "#00B050", // 꽃감염위험도 낮음 & 출현없음 (green)
  2: "#FFC000", // 꽃감염위험도 다소 높음 & 출현없음 (yellow)
  3: "#ED7D31", // 꽃감염위험도 위험 & 출현없음 (orange)
  4: "#FF0000", // 꽃감염위험도 매우위험 & 출현없음 (red)
  5: "purple", // 꽃감염위험도 상관없이 출현이 있으면
};

const MapComponent = (props) => {
  const MaxMarkerSelectCount = 4;
  const {
    spots,
    fireblightSpots,
    addSelectedSpots,
    selectedSpots,
    selectedProvince,
  } = props;
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [visibleFireblightSpots, setVisibleFireblightSpots] = useState(false);
  const [fbSpotInfo, setFbSpotInfo] = useState([]);

  const mapUrls = {
    base: "https://xdworld.vworld.kr/2d/Base/201612/{z}/{x}/{y}.png",
    hybrid: "https://xdworld.vworld.kr/2d/Hybrid/201612/{z}/{x}/{y}.png",
    satellite: "https://xdworld.vworld.kr/2d/Satellite/201612/{z}/{x}/{y}.jpeg",
  };

  const onClickMap = (e) => {
    console.log(e.latlng);
  };

  const onClickMarker = (e) => {
    console.log(e.latlng);
  };

  const onClickStationMarker = (e) => {
    const target = e.target.options.data;
    let isExist = false;
    let isSelectable = true;
    // 이미 선택한 지점여부 체크
    if (selectedSpots.filter((item) => item.id == target.id).length > 0) {
      isExist = true;
      alert("이미 선택한 지점입니다.");
      return;
    }
    if (MaxMarkerSelectCount <= selectedSpots.length) {
      isSelectable = false;
      alert("최대 4곳까지 선택가능합니다.");
      return;
    }
    addSelectedSpots([...selectedSpots, { ...target }]);
  };

  const onClickFBMarker = (e) => {
    console.log("onClickFBMarker", e.latlng, e.target.options.data);
  };

  const onClickVisibleFrieblightButton = (e) => {
    // 등록된 화상병 발생 지점이 없을 때, 화상병 발생 지점 표시버튼을 클릭할 경우
    if (!visibleFireblightSpots & (fireblightSpots.length < 1)) {
      alert(
        "현재 등록된 화상병 발생 지점이 없습니다. 화상병 발생 지점을 등록해 보세요."
      );
      return;
    }
    setVisibleFireblightSpots(!visibleFireblightSpots);
  };

  return (
    <MapWrapper>
      {/* <ToggleButton onClick={onClickVisibleFrieblightButton}>
        {!visibleFireblightSpots
          ? "화상병 발생 지점 표시"
          : "화상별 발생 지점 숨기기"}
      </ToggleButton> */}
      <Map
        center={
          selectedProvince
            ? [selectedProvince.center.lat, selectedProvince.center.lon]
            : [35.9078, 127.7669]
        }
        zoom={11}
        minZoom={7} // 줌을 줄여도 한국지도가 나오도록
        style={{ width: "100%" }}
        // onClick={onClickMap}
      >
        <ScaleControl
          metric={true}
          imperial={false}
          ScaleControl={true}
        ></ScaleControl>
        <TileLayer url={mapUrls.satellite} attribution="VWORLD" />
        <WMSTileLayer url={mapUrls.hybrid} />
        {/* <Marker position={[marker.lat, marker.lng]}></Marker> */}
        {spots
          ? spots.map((spot, idx) => (
              <Marker
                data={spot}
                key={spot.id}
                onClick={(e) => {
                  onClickStationMarker(e);
                }}
                position={[spot["lat"], spot["lon"]]}
                icon={divIcon({
                  className: "",
                  iconSize: [24, 24],
                  html: getMarkerIcon(
                    spot.fbStatus
                      ? statusColors[spot.fbStatus]
                      : statusColors[0],
                    spot.id ? spot.id : "-",
                    selectedSpots.filter((item) => item.id == spot.id).length >
                      0
                      ? true
                      : false
                  ),
                })}
              >
                {/* <Tooltip><InformationInTooltip data={spot} /> </Tooltip>*/}
                {/* <Popup><InformationInPopup data={spot} /></Popup> */}
              </Marker>
            ))
          : null}
        {fireblightSpots && visibleFireblightSpots
          ? fireblightSpots.map((spot, idx) => (
              <Marker
                data={spot}
                key={idx}
                onClick={(e) => onClickFBMarker(e)}
                position={[spot["lat"], spot["lon"]]}
                icon={divIcon({
                  className: "",
                  iconSize: [24, 24],
                  html: `<div style="display: flex; align-items: center; justify-content: center; font-size:10px; color:white; background:${
                    spot.color ? spot.color : "#FF0000"
                  }; height:24px; border-radius:50%; box-shadow: 1px 1px 1px #7C7C7C;">FB<div/>`,
                })}
              >
                <Tooltip>
                  {spot.year}({spot.number}): {spot.fruit}
                </Tooltip>
                <Popup>
                  <FireblightSpotPopupInfo data={spot} />
                </Popup>
              </Marker>
            ))
          : null}
      </Map>
    </MapWrapper>
  );
};

export default MapComponent;
