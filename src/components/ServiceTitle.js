import React from "react";
import styled from "styled-components";

import fireblightLogo from "../img/fireblight_logo.png";
import fireblightLogoMedium from "../img/fireblight_logo_medium.png";
import fireblightLogoSmall from "../img/fireblight_logo_small.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Image = styled.img`
  height: 32px;
  box-sizing: border-box;
  margin-right: 5px;
`;

const ServiceTitle = () => {
  return (
    <Wrapper>
      <Image src={fireblightLogoSmall} alt="service logo" />
      <Title>화상병 연구지도</Title>
    </Wrapper>
  );
};

export default ServiceTitle;
