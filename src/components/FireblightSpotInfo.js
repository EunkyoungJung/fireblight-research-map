import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  border-color: gray;
  margin-right: 15px;
  background-color: orange;
  box-sizing: border-box;
  padding: 10px;
  flex: 0 0 auto;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #bf9000;
`;

const FireblightSpotInfo = (props) => {
  const { data } = props;
  return <Wrapper>화상병 분석 report {data}</Wrapper>;
};

export default FireblightSpotInfo;
