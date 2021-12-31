import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import XLSX from "xlsx";

import ServiceTitle from "./components/ServiceTitle";
import MapComponent from "./components/MapComponent";
import FavoriteSpots from "./components/FavoriteSpots";

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

const MenuWrapper = styled.div``;

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
  return (
    <Wrapper>
      <NavWrapper>
        <ServiceTitle />
        <MenuWrapper>
          <Selector>
            <option>배</option>
            <option>사과</option>
          </Selector>
          <Selector>
            <option>2021</option>
          </Selector>
          <Button>화상병 발생 지점 등록</Button>
        </MenuWrapper>
      </NavWrapper>
      <ContentsWrapper>
        <MapComponentWrapper>
          <MapComponent />
        </MapComponentWrapper>
        <FavoriteSpots />
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;
