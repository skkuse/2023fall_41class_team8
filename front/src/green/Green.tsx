import { Box, Card, List, ListItemButton, ListSubheader, Stack } from "@mui/material"
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

const Green = () => {
  const [id, setId] = useState<number | null>(null);

  const categoryList = () => {
    return techniquesData.map((c) => {
      return (
        <>
          <ListSubheader key={c.name}>{c.name}</ListSubheader>
          {c.techniques.map((t) => (
            <ListItemButton key={t.id} onClick={() => setId(t.id)} selected={t.id === id}>
              {t.name}
            </ListItemButton>
          ))}
        </>
      )
    })
  }


  return (
    <Stack style={{ display: "flex", overflowY: "auto" }} direction="row" spacing={2} >
      <Card style={{ flex: 2, borderRadius: '12px' }}>
        <List>{categoryList()}</List>
      </Card>
      <Card style={{ flex: 8, borderRadius: '12px' }}>
        {id ?
          <CodeInfo before={PatternDetailData[id].before} after={PatternDetailData[id].after} />
          : <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <h1>그린 패턴을 선택해주세요</h1>
          </Box>}
      </Card>
    </Stack>
  )
}

export default Green
