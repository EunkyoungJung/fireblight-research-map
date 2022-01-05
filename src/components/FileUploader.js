import React from "react";
import styled from "styled-components";
import XLSX from "xlsx";

import sampleFbSpot from "../data/sampleFbSpot.json";
import ConvertCsvIntoTable from "./ConvertCsvIntoTable";
import SampleFBExcelFile from "../data/fb_sample.xlsx";

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 25px;
`;

const DownloadLink = styled.a`
  display: inline-block;
  background-color: blue;
  color: white;
  font-weight: 600;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px;
`;

const FileInputWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
`;

const AlertInfoWrapper = styled.div`
  color: red;
`;

const Input = styled.input`
  width: 100%;
  background: lightblue;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
`;

// 업로드 파일의 최대 용량 제한 로직 필요!
const FileUploader = (props) => {
  const { updateFireblightSpots, onClose } = props;
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;

      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        let jsObject = JSON.parse(jsonObject);
        let result = [];
        jsObject.map((item, index) => {
          result.push({
            id: index,
            number: item["발생번호"],
            fruit: item["과종"],
            disease: "화상병",
            year: item["발생연도"],
            name: null,
            address: item["과원주소"],
            lon: item["경도"],
            lat: item["위도"],
            lent: item["임차구분"] == "임차" ? true : false,
            area: item["폐원면적"],
            totalTree: item["전체주수"],
            illedTree: item["발생주수"],
            ratio: item["발생비율"],
            removedTree: item["제거주소"],
            isClosed: item["폐원구분"] == "폐원" ? true : false,
          });
        });
        try {
          updateFireblightSpots(result);
          alert("파일 업로드를 완료하였습니다.");
          onClose();
        } catch (error) {
          alert(
            "파일 업로드에 실패하였습니다. 파일양식을 다시 확인하여 주세요."
          );
        }
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  };
  return (
    <Wrapper>
      <Title>화성병 발생 지점 등록하기</Title>
      <FileInputWrapper>
        <Input type="file" onChange={handleChange} />
      </FileInputWrapper>
      <div>※ 업로드 파일의 샘플 예시</div>
      {/* <DownloadButton>샘플파일 다운로드</DownloadButton> */}
      <DownloadLink href={SampleFBExcelFile} download="fb_sample.xlsx">
        샘플파일 다운로드
      </DownloadLink>
      <ConvertCsvIntoTable rows={sampleFbSpot} />
      <AlertInfoWrapper>
        <div>※ 주의 ※ </div>
        <span>
          필수 컬럼의 경우, 반드시 입력되어야 하며, 컬럼명이 반드시
          일치해야합니다: (*필수 컬럼: 발생연도, 발생번호, 과종, 과원주소, 경도,
          위도)
        </span>
      </AlertInfoWrapper>
    </Wrapper>
  );
};

export default FileUploader;
