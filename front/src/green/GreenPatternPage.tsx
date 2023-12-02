import { Box, Card, List, ListItemButton, ListSubheader, Stack, Typography } from "@mui/material"
import { useState } from "react";
import CodeInfo from "./CodeInfo";
import techniquesData, { } from "./patternMockData";
import { Sample } from "../analyser/Analyser";
import { PatternDetailData } from "./patternDetailMockData";

export type ExecutionData = {
  code: string;
  time: string;
  energy: string;
  carbon: string;
  samples: Sample[];
}

const GreenPatternPage = () => {
  const [id, setId] = useState<number | null>(null);

  const categoryList = techniquesData.map((c) => {
    return [
      <ListSubheader key={c.name}>{c.name}</ListSubheader>,
      c.techniques.map((t) => (
        <ListItemButton key={t.id} onClick={() => setId(t.id)} selected={t.id === id}>
          <Typography>{t.name}</Typography>
        </ListItemButton>
      ))
    ];
  });


  return (
    <Stack style={{ display: "flex", overflowY: "auto" }} direction="row" spacing={2} >
      <Card style={{ flex: 2, borderRadius: '12px' }}>
        <List>{categoryList}</List>
      </Card>
      <Card style={{ flex: 8, borderRadius: '12px' }}>
        {id ?
          <CodeInfo before={PatternDetailData[id].before} after={PatternDetailData[id].after} />
          : <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
            <Typography variant="h3">그린 패턴을 선택해주세요</Typography>
          </Box>}
      </Card>
    </Stack>
  )
}

export default GreenPatternPage
