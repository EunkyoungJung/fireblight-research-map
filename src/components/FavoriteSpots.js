import React from "react";
import styled from "styled-components";

import favoriteSelect from "../img/favorite_select.png";
import favoriteDeselect from "../img/favorite_deselect.png";
import FireblightSpotInfo from "./FireblightSpotInfo";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  box-sizing: border-box;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
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

const Contents = styled.div`
  // 캐러셀 CSS
  width: 100%;
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 5px;
`;

const FavoriteSpots = (props) => {
  // const { favorites } = props;
  const favorites = [1, 2, 3, 4];

  return (
    <Wrapper>
      <Title>
        <Image src={favoriteSelect} alt="favorite icon" />
        관심 지점 (최대 4곳)
      </Title>
      <Contents>
        {favorites
          ? favorites.map((item) => <FireblightSpotInfo data={item} />)
          : null}
      </Contents>
    </Wrapper>
  );
};

export default FavoriteSpots;
