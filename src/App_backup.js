import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import XLSX from "xlsx";

import MapContainer from "../src/components/MapContainer";
import ExplainHowToUse from "../src/components/ExplainHowToUse";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  font-size: 1rem;
`;

const RightSectionWrapper = styled.div`
  width: 25%;
  padding: 0.5rem;
  margin: 0;
  box-sizing: border-box;
  font-size: 11px;
`;

const Input = styled.input`
  width: 100%;
  background: lightblue;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
`;

function App() {
  const [selectedArea, setSelectedArea] = useState({
    id: 0,
    areaName_eng: "korea",
    areaName_kor: "대한민국",
    location: { cityName_eng: "", cityName_kor: "" },
    municipalLevelDivisionCode: null,
    crops: [],
    crops_kor: [],
    cropsInfo: [{ id: null, name: null, name_kor: null, icon: null }],
    mapInfo: {
      coordinate: { lat: 35.9078, lng: 127.7669 },
      zoom: 7.45,
    },
  });
  const [spots, setSpots] = useState();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;

      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        let jsObject = JSON.parse(jsonObject);
        setSpots(jsObject);
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  };

  return (
    <>
      <Wrapper>
        <MapContainer selectedArea={selectedArea} spots={spots} />
        <RightSectionWrapper>
          <Input type="file" onChange={handleChange} />
          <ExplainHowToUse />
        </RightSectionWrapper>
      </Wrapper>
    </>
  );
}

export default App;
