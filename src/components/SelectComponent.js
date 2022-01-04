import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 16px;
  text-align: center;
  margin-left: 5px;
`;

const Select = styled.select`
  width: 100px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
`;

const Option = styled.option`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
`;

const SelectComponent = (props) => {
  const { options, selectedOption, onChangeOption } = props;

  return (
    <Wrapper>
      <Select
        defaultValue={selectedOption}
        onChange={(e) => {
          onChangeOption(e.target.value);
        }}
      >
        {options.map((item, index) => (
          <option
            defaultValue={item == selectedOption ? true : false}
            key={index}
            value={item}
          >
            {item}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectComponent;
