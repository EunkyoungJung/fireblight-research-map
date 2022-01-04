import React, { useEffect, useState } from "react";
import styled from "styled-components";

import favoriteSelect from "../img/favorite_select.png";
import favoriteDeselect from "../img/favorite_deselect.png";
import FireblightSpotInfo from "./FireblightSpotInfo";
import FireBlightReport from "./FireBlightReport";

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   padding-left: 5px;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
`;

const Image = styled.img`
  height: 20px;
  padding-right: 2px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 5px;
`;

// const Contents = styled.div`
//   // 캐러셀 CSS
//   width: 100%;
//   display: flex;
//   flex-wrap: no-wrap;
//   overflow-x: auto;
//   overflow-y: hidden;
//   box-sizing: border-box;
//   padding: 5px;
// `;

const Contents = styled.div`
  height: 90%;
  display: flex;
  /* display: flex;
  flex-wrap: no-wrap; */
  overflow-x: scroll;
  overflow-y: hidden;
`;

const NoData = styled.div`
  font-size: 11px;
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  color: white;
  background-color: gray;
  border-radius: 5px;
  margin: 2px;
`;

const testDiv = styled.div`
  width: 50px;
  height: 5px;
  background-color: red;
`;

const FavoriteSpots = (props) => {
  const { spots, selectedYear, selectedFruit } = props;

  return (
    <Wrapper>
      <Title>
        {/* <Image src={favoriteSelect} alt="favorite icon" />
        관심 지점 (최대 4곳) */}
        선택 지점1 (최대 4곳)
      </Title>
      <Contents>
        {console.log("관심지점", spots)}
        {spots && spots.length > 0 ? (
          spots.map((item) => (
            // <FireBlightReport spto={item} fbSpotData={item} />
            <FireBlightReport
              key={item.id}
              spot={item}
              selectedYear={selectedYear}
              selectedFruit={selectedFruit}
            />
            // <testDiv>테스트div</testDiv>
          ))
        ) : (
          <NoData>
            선택된 지점이 없습니다. 왼쪽 지도에서 지점을 선택하여 주세요. (최대
            4개)
          </NoData>
        )}
      </Contents>
    </Wrapper>
  );
};

export default FavoriteSpots;
