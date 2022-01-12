import React from "react";
import styled from "styled-components";

const lineColor = "lightgray";

const LineBoxWrapper = styled.div`
  position: relative;
  width: 20px; /* X 사이즈 */
  height: 20px; /* X 세로 중앙 */
  margin: 0 auto; /* 가운데 정렬 */
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const LineBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const Line1 = styled.span`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background-color: ${lineColor};
  transform: rotate(135deg) translateX(0%);
`;

const Line2 = styled.span`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background-color: ${lineColor};
  transform: rotate(45deg) translateX(0%);
`;

const CloseButton = () => {
  return (
    <LineBoxWrapper>
      <LineBox>
        <Line1 />
        <Line2 />
      </LineBox>
    </LineBoxWrapper>
  );
};

export default CloseButton;
