import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const FireblightSpotPopupInfo = (props) => {
  const { data } = props;
  return (
    <Wrapper>
      <div>-발생연도: {data.year}</div>
      <div>-발생번호: {data.number}</div>
      <div>-과종: {data.fruit}</div>
      <div>
        -위/경도: {data.lat}/{data.lon}
      </div>
      <div>-임차구분: {data.lent ? "임차" : "자경"}</div>
      <div>-폐원면적(㎡): {data.area}</div>
      <div>
        -발생수주/전체주수: {data.illedTree}/{data.totalTree}
      </div>
      <div>-발생비율: {data.ratio}</div>
      <div>-폐원구분: {data.isClosed ? "폐원" : "-"}</div>
    </Wrapper>
  );
};

export default FireblightSpotPopupInfo;
