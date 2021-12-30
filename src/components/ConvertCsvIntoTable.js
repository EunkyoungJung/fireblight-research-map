import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  height: 70%;
  border: None;
`;

const Table = styled.table`
  box-sizing: border-box;
  /* border: 0.1rem solid #dddddd; */
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: 0.2rem;
`;

const Th = styled.th`
  box-sizing: border-box;
  padding: 0.2rem;
  border: 0.1rem solid #dddddd;
  background-color: #f2f2f2;
  font-weight: bold;
  position: sticky;
  top: 0px;
`;

const Tbody = styled.tbody`
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
`;

const Td = styled.td`
  box-sizing: border-box;
  padding: 0.2rem;
  border: 0.1rem solid #dddddd;
`;

const CustomedTable = (props) => {
  const { rows } = props;
  return (
    <TableWrapper>
      <Table>
        <thaed>
          <tr>
            {rows[0].map((col) => (
              <Th>{col}</Th>
            ))}
          </tr>
          <Tbody>
            {rows.map((items, idx) => (
              <tr>{idx !== 0 ? items.map((item) => <Td>{item}</Td>) : null}</tr>
            ))}
          </Tbody>
        </thaed>
      </Table>
    </TableWrapper>
  );
};

export default CustomedTable;
