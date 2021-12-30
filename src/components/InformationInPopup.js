import React from "react";
import styled from "styled-components";
import * as DateUtils from "../utils/DateUtils";

const Wrapper = styled.div``;
const Item = styled.div``;

const InformationInPopup = (props) => {
  const { data } = props;
  const columns = Object.keys(data);
  return (
    <Wrapper>
      {columns.map((col, idx) =>
        col === "조사날짜" ? (
          <Item id={idx}>{`● ${col}: ${DateUtils.getFormattedDate(
            DateUtils.ExcelDateToJSDate(data[col])
          )}`}</Item>
        ) : (
          <Item id={idx}>{`● ${col}: ${data[col]}`}</Item>
        )
      )}
    </Wrapper>
  );
};

export default InformationInPopup;
