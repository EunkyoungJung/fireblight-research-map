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
import InformationInTooltip from "./InformationInTooltip";
import InformationInPopup from "./InformationInPopup";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  z-index: 9999;
  background-color: red;
  color: white;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`;

const MapComponent = (props) => {
  const { spots, fireblightSpots } = props;
  const [marker, setMarker] = useState({
    lat: 0,
    lng: 0,
  });
  const [visibleFireblightSpots, setVisibleFireblightSpots] = useState(false);
  const [fbSpotInfo, setFbSpotInfo] = useState([]);

  const pallette = {
    없음: "#A5A5A5",
    낮음: "#00B050",
    "다소 높음": "#FFC000",
    위험: "#ED7D31",
    "매우 위험": "#FF0000",
  };

  const mapUrls = {
    base: "https://xdworld.vworld.kr/2d/Base/201612/{z}/{x}/{y}.png",
    hybrid: "https://xdworld.vworld.kr/2d/Hybrid/201612/{z}/{x}/{y}.png",
    satellite: "https://xdworld.vworld.kr/2d/Satellite/201612/{z}/{x}/{y}.jpeg",
  };

  const onClickMap = (e) => {
    setMarker(e.latlng);
  };

  const onClickVisibleFrieblightButton = (e) => {
    setVisibleFireblightSpots(!visibleFireblightSpots);
  };

  return (
    <MapWrapper>
      <ToggleButton onClick={onClickVisibleFrieblightButton}>
        {!visibleFireblightSpots
          ? "화상병 발생 지점 표시"
          : "화상별 발생 지점 숨기기"}
      </ToggleButton>
      <Map
        center={[35.9078, 127.7669]}
        zoom={7.45}
        minZoom={7} // 줌을 줄여도 한국지도가 나오도록
        style={{ width: "100%" }}
        onClick={onClickMap}
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
                key={idx}
                onClick={function (e) {
                  console.log("ahahah", e);
                }}
                position={[spot["lat"], spot["lon"]]}
                icon={divIcon({
                  className: "",
                  iconSize: [24, 24],
                  html: `<div style="display: flex; align-items: center; justify-content: center; font-size:10px; color:white; background:${
                    spot.color ? spot.color : "#A5A5A5"
                  }; height:24px; border-radius:50%; box-shadow: 1px 1px 1px #7C7C7C;">${
                    spot.name
                  }<div/>`,
                })}
              >
                {/* <Tooltip>
                  <InformationInTooltip data={spot} />
                </Tooltip>
                <Popup>
                  <InformationInPopup data={spot} />
                </Popup> */}
              </Marker>
            ))
          : null}
        {fireblightSpots && visibleFireblightSpots
          ? fireblightSpots.map((spot, idx) => (
              <Marker
                key={idx}
                onClick={function (e) {
                  console.log("ahahah", e);
                }}
                position={[spot["lat"], spot["lon"]]}
                icon={divIcon({
                  className: "",
                  iconSize: [24, 24],
                  html: `<div style="display: flex; align-items: center; justify-content: center; font-size:10px; color:white; background:${
                    spot.color ? spot.color : "#FF0000"
                  }; height:24px; border-radius:50%; box-shadow: 1px 1px 1px #7C7C7C;">FB<div/>`,
                })}
              ></Marker>
            ))
          : null}
      </Map>
    </MapWrapper>
  );
};

export default MapComponent;
