import React from "react";
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
`;

const Image = styled.img`
  height: 20px;
  padding-right: 2px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
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
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const FavoriteSpots = (props) => {
  // const { favorites } = props;
  const favorites = [1, 2, 3, 4];

  const { spots } = props;

  return (
    <Wrapper>
      <Title>
        <Image src={favoriteSelect} alt="favorite icon" />
        관심 지점 (최대 4곳)
      </Title>
      <Contents>
        {favorites
          ? spots.map((item) => <FireBlightReport spot={item} />)
          : null}
      </Contents>
    </Wrapper>
  );
};

export default FavoriteSpots;
