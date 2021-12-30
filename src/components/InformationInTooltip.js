import React from "react";
import styled from "styled-components";
import * as DateUtils from "../utils/DateUtils";

const Wrapper = styled.div``;

const Item = styled.div``;

const InformationInTooltip = (props) => {
  const { data } = props;
  const itemsInTooltip = ["조사날짜", "작물명", "병해충명", "증상부위"];

  return (
    <Wrapper>
      {itemsInTooltip.map((item, idx) =>
        item === "조사날짜" ? (
          <Item>{`● ${item}: ${DateUtils.getFormattedDate(
            DateUtils.ExcelDateToJSDate(data[item])
          )}`}</Item>
        ) : (
          <Item>{`● ${item}: ${data[item]}`}</Item>
        )
      )}
    </Wrapper>
  );
};

export default InformationInTooltip;
