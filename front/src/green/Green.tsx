import { Button, Collapse, List, ListItem, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CodeInfo from "./CodeInfo";
import techniquesData, { Category, Technique } from "./patternMockData";
import { PatternDetailData } from "./patternDetailMockData";

const Green = () => {
    const [open, setOpen] = useState(true);
    const [id, setId] = useState(16)

    const handleButtonClick = (techId: number) => {
        console.log(techId);
        setId((prevId) => {
            // Do any additional processing with the previous state if needed
            console.log(prevId);
            return techId;
        });
    };


    return (
        <Stack style={{ display: "flex", overflowY: "auto" }} direction="row" spacing={2} >
            <Paper style={{ flex: 2, borderRadius: '12px' }}>
                <List
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <>
                        {Object.values(techniquesData).map((category: Category) => (
                            <ListItem style={{ display: 'flex', flexDirection: 'column' }} key={category.name} onClick={() => setOpen(true)}>
                                <Typography>{category.name}</Typography>
                                {category.techniques.map((tech: Technique) => (
                                    <Collapse style={{ paddingLeft: '10px' }} key={tech.id} in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <Button size="small" variant="text" onClick={() => handleButtonClick(tech.id)}>
                                                {tech.name}
                                            </Button>
                                        </List>
                                    </Collapse>
                                ))}
                            </ListItem>
                        ))}
                    </>

                </List>
            </Paper>
            <Paper style={{ flex: 8, borderRadius: '12px' }}>
                <CodeInfo id={id} />
            </Paper>
        </Stack>
    )
}

export default Green
