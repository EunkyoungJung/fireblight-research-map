import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 16px;
  text-align: center;
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
  const { options } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Wrapper>
      <Select>
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectComponent;
