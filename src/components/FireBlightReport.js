import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import FlowerInfectionDangerChart from "./FlowerInfectionDangerChart";

const Wrapper = styled.div`
  width: 350px;
  height: 100%;
  border-color: gray;
  margin-right: 15px;
  background-color: #cee5d0;
  box-sizing: border-box;
  padding: 10px;
  flex: 0 0 auto;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #c9c9c9;
  overflow-y: auto;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const SubTitle = styled.div``;

const SubContents = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px;
  margin-top: 5px;
`;

const DateIcon = styled.div`
  font-size: 11px;
  color: white;
  background-color: purple;
  padding: 5px;
  border-radius: 5px;
  margin: 2px;
`;

const NoData = styled.div`
  font-size: 11px;
  color: white;
  background-color: gray;
  padding: 5px;
  border-radius: 5px;
  margin: 2px;
`;

const DatesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DateListComponent = (props) => {
  const { title, data } = props;

  return (
    <SubContents>
      <SubTitle>{title}</SubTitle>
      <DatesWrapper>
        {data && data.length > 0 ? (
          data.map((item, index) => <DateIcon>{item.tm}</DateIcon>)
        ) : (
          <NoData>해당 데이터 없음</NoData>
        )}
      </DatesWrapper>
    </SubContents>
  );
};

const FireBlightReport = (props) => {
  const { spot } = props;
  const [isInit, setIsinit] = useState(false);
  const [success, setSucess] = useState(false);
  const [fireblightDailyReports, setFireblightDailyReports] = useState(null);
  const [bbs, setBbs] = useState([]);
  const [cms, setCms] = useState([]);
  const [cbs, setCbs] = useState([]);
  const [sbs, setSbs] = useState([]);

  const growthTitle = {
    1: "낙엽/휴면기",
    2: "발아기",
    3: "개화기",
    4: "만개기",
    5: "낙화기",
    6: "과실비대초기",
    7: "과실비대기",
  };

  const begin = "2021-01-01";
  // const today = new Date().toISOString().split("T")[0];
  const today = "2021-08-30";
  const GetFBSpotData = async (spot) => {
    await axios
      .get(
        `https://fireblight.org/fireblight/getListMaryblyts?begin=${begin}&until=${today}&plant=apple&lon=${spot.lon}&lat=${spot.lat}&format=json`
        // "https://fireblight.org/fireblight/getListMaryblyts?begin=2021-04-10&until=2021-04-10&plant=apple&lon=127.7669&lat=35.9078&format=json"
      )
      .then((response) => {
        const data = response.data;
        setSucess(true);
        setFireblightDailyReports(data);
        setBbs(data.filter((item) => item.bbs !== null));
        setCms(data.filter((item) => item.cms !== null));
        setCbs(data.filter((item) => item.cbs !== null));
        setSbs(data.filter((item) => item.sbs !== null));
      });
  };

  useEffect(() => {
    GetFBSpotData(spot);
    setIsinit(!isInit);
  }, [spot]);

  return (
    <Wrapper>
      <Contents>
        <Title>{spot.name} 화상병 예측 보고서</Title>
        <div>
          대상기간: {begin} ~ {today} (현재)
        </div>
        <div>
          현재 생육단계:{" "}
          {fireblightDailyReports
            ? growthTitle[
                fireblightDailyReports[fireblightDailyReports.length - 1].growth
              ]
            : "-"}
        </div>
        <SubContents>
          <SubTitle>꽃감염 위험도 그래프</SubTitle>
          <FlowerInfectionDangerChart
            title="꽃 감염 위험단계"
            data={fireblightDailyReports}
          />
        </SubContents>
        <DateListComponent title="꽃병징 출현" data={bbs} />
        <DateListComponent title="궤양활성 출현" data={cms} />
        <DateListComponent title="궤양병징 출현" data={cbs} />
        <DateListComponent title="신초증상 출현" data={sbs} />
      </Contents>
    </Wrapper>
  );
};

export default FireBlightReport;
