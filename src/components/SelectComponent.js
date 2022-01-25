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
          const targetItemId = e.target.value;
          const targetItem = options.filter(
            (item) => item.id == targetItemId
          )[0];
          onChangeOption({ ...targetItem });
        }}
      >
        {options.map((item, index) => (
          <option
            defaultValue={item.id == selectedOption.id ? true : false}
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectComponent;
