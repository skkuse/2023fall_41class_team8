import { Box, Card, List, ListItem, ListItemButton, ListSubheader, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CodeInfo from "./CodeInfo";
import { Sample } from "../analyser/Analyser";

// 코드 실행 결과를 나타내는 타입
export type ExecutionData = {
  code: string;
  time: string;
  energy: string;
  carbon: string;
  samples: Sample[];
}

// 그린 패턴 요약 정보 타입
export type Technique = {
  id: number;
  name: string;
}

// 그린 패턴 카테고리 타입
export type Category = {
  name: string;
  techniques: Technique[];
}

// 그린 패턴 적용 전후의 코드 실행 결과를 모두 포함한 타입
export type CodePerformanceData = {
  before: ExecutionData;
  after: ExecutionData;
}

const GreenPatternPage = () => {
  // 현재 선택된 그린 패턴의 id
  const [id, setId] = useState<number | null>(null);
  // 그린 패턴 카테고리 목록
  // null이면 로딩 중, []이면 로딩 완료
  const [category, setCategory] = useState<Category[] | null>(null);
  // 현재 표시할 그린 패턴 적용 정보
  // null이면 로딩 중, 아닐 경우 로딩 완료
  const [performanceData, setPerformanceData] = useState<CodePerformanceData | null>(null);
  // 에러 발생 여부
  const [error, setError] = useState<boolean>(false);

  // 컴포넌트가 마운트되면 그린 패턴 목록을 가져옴
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchRes = await fetch('/api/patterns');
        const res = await fetchRes.json() as Category[];
        setCategory(res);
      } catch (e) {
        setError(true);
        return;
      }
    }
    fetchCategory();
  }, []);

  // 그린 패턴을 선택하면 해당 패턴의 성능 정보를 가져옴
  const getPerformance = async (id: number) => {
    setError(false);
    setPerformanceData(null);
    try {
      const fetchRes = await fetch(`/api/pattern?id=${id}`);
      const res = await fetchRes.json() as CodePerformanceData;
      setPerformanceData(res);
    } catch (e) {
      setError(true);
      return;
    }
    setId(id);
  }

  // 카테고리 목록을 표시하는 컴포넌트 생성 함수
  const categoryList = () => {
    if (!category) {
      return (
        <ListItem>
          <Typography>로딩중...</Typography>
        </ListItem>
      );
    } else {
      return category.map((c) => [
        <ListSubheader key={c.name}>{c.name}</ListSubheader>,
        c.techniques.map((t) => (
          <ListItemButton key={t.id} onClick={() => getPerformance(t.id)} selected={t.id === id}>
            <Typography>{t.name}</Typography>
          </ListItemButton>
        ))
      ]);
    }
  }

  // 그린 패턴 적용 정보를 표시하는 컴포넌트 생성 함수
  const displayTechnique = () => {
    if (!category) {
      return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
          <Typography variant="h4">잠시만 기다려주세요...</Typography>
        </Box>
      );
    } else if (!id) {
      return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
          <Typography variant="h4">그린 패턴을 선택해주세요</Typography>
        </Box>
      );
    } else if (error) {
      return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
          <Stack spacing={2} alignItems='center'>
            <Typography variant="h4">패턴을 가져오는 도중에 에러가 발생했습니다.</Typography>
            <Typography variant="h4">다른 패턴을 선택해주세요.</Typography>
          </Stack>
        </Box>
      );
    } else if (!performanceData) {
      return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
          <Typography variant="h4">패턴을 가져오는 중입니다...</Typography>
        </Box>
      )
    } else return <CodeInfo before={performanceData.before} after={performanceData.after} />
  }

  return (
    <Stack style={{ display: "flex", overflowY: "auto" }} direction="row" spacing={2} >
      <Card style={{ flex: 2, borderRadius: '12px' }}>
        <List>{categoryList()}</List>
      </Card>
      <Card style={{ flex: 8, borderRadius: '12px' }}>
        {displayTechnique()}
      </Card>
    </Stack>
  )
}

export default GreenPatternPage
