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
  color: #429a7a;
  /* color: rgb(40, 171, 185); */
  font-weight: 600px;
`;

const Image = styled.img`
  height: 32px;
  box-sizing: border-box;
  margin-right: 5px;
`;

const serviceTitle = "과수화상병 예측 모니터링 시제품";

const ServiceTitle = () => {
  return (
    <Wrapper>
      {/* <Image src={fireblightLogoSmall} alt="service logo" /> */}
      <Title>{serviceTitle}</Title>
    </Wrapper>
  );
};

export default ServiceTitle;
