import { List, ListItemButton, ListSubheader, Paper, Stack } from "@mui/material"
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
  // const [open, setOpen] = useState(true);
  const [id, setId] = useState(16);

  const handleButtonClick = (techId: number) => {
    console.log(techId);
    setId((prevId) => {
      // Do any additional processing with the previous state if needed
      console.log(prevId);
      return techId;
    });
  };

  const categoryList = () => {
    return techniquesData.map((c) => {
      return (
        <>
          <ListSubheader key={c.name}>{c.name}</ListSubheader>
          {c.techniques.map((t) => (
            <ListItemButton key={t.id} onClick={() => handleButtonClick(t.id)} selected={t.id === id}>
              {t.name}
            </ListItemButton>
          ))}
        </>
      )
    })
  }


  return (
    <Stack style={{ display: "flex", overflowY: "auto" }} direction="row" spacing={2} >
      <Paper style={{ flex: 2, borderRadius: '12px' }}>
        <List>{categoryList()}</List>
      </Paper>
      <Paper style={{ flex: 8, borderRadius: '12px' }}>
        <CodeInfo before={PatternDetailData[id].before} after={PatternDetailData[id].after} />
      </Paper>
    </Stack>
  )
}

export default Green
