import React from "react";
import styled from "styled-components";

import ConvertCsvIntoTable from "./ConvertCsvIntoTable";
import sampleTable from "../data/sampleTable.json";

const Wrapper = styled.div`
  font-size: 0.5rem;
`;

const ExplainHowToUse = () => {
  return (
    <Wrapper>
      <div>※ 업로드 파일의 샘플 예시</div>
      <ConvertCsvIntoTable rows={sampleTable} />
      <div>※ 주의 ※ </div>
      <span>
        필수 colum의 경우, 반드시 입력되어야 하며, 컬럼명이 반드시
        일치해야합니다:
      </span>
      <h1>"조사날짜, 작물명, color, 병해충명, 증상부위"</h1>
    </Wrapper>
  );
};

export default ExplainHowToUse;
