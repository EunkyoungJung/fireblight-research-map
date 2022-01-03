import React, { useState } from "react";
import styled from "styled-components";

import pear from "../img/pear.png";
import apple from "../img/apple.png";

const Wrapper = styled.div`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2px 0 2px;
`;

const Image = styled.img`
  width: 30px;
  cursor: pointer;
`;

const AppleOrPearToggleButton = (props) => {
  const [isApple, setIsApple] = useState(true);

  const onClickButton = (e) => {
    setIsApple(!isApple);
  };

  return (
    <Wrapper>
      <Image
        onClick={onClickButton}
        src={isApple ? apple : pear}
        alt={isApple ? "사과 버튼" : "배 버튼"}
      />
    </Wrapper>
  );
};

export default AppleOrPearToggleButton;
