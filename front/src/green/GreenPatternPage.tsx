import { Box, Card, List, ListItem, ListItemButton, ListSubheader, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CodeInfo from "./CodeInfo";
import { Sample } from "../analyser/Analyser";

export type ExecutionData = {
  code: string;
  time: string;
  energy: string;
  carbon: string;
  samples: Sample[];
}

export interface Technique {
  id: number;
  name: string;
}

export interface Category {
  name: string;
  techniques: Technique[];
}

type CodePerformanceData = {
  before: ExecutionData;
  after: ExecutionData;
}

const GreenPatternPage = () => {
  const [id, setId] = useState<number | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [performanceData, setPerformanceData] = useState<CodePerformanceData | null>(null);
  const [error, setError] = useState<boolean>(false);

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
