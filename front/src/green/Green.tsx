import { Button, Collapse, List, ListItem, Paper, Stack, Typography } from "@mui/material"
import mockData from "./mock"
import { useState } from "react";
import CodeInfo from "./CodeInfo";

const Green = () => {
    console.log(mockData);
    const [open, setOpen] = useState(true);

    return (
        <Stack style={{ display: "flex" }} direction="row" spacing={2}>
            <Paper style={{ flex: 2, borderRadius: '12px', height: "100vh" }}>
                <List
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <>
                        {mockData.map((item) => {
                            return (
                                <ListItem style={{ display: "flex", flexDirection: "column" }} key={item.id} onClick={() => setOpen(true)}>
                                    <Typography>{item.name}</Typography>
                                    {
                                        item.techniques.map((tech) => {
                                            return (
                                                <Collapse style={{ paddingLeft: "10px" }} key={tech.id} in={open} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <Button size="small" variant="text">{tech.name}</Button>
                                                    </List>
                                                </Collapse>
                                            )
                                        })
                                    }
                                </ListItem>
                            )

                        })}
                    </>

                </List>
            </Paper>
            <Paper style={{ flex: 8, borderRadius: '12px', height: "100vh" }}>
                <CodeInfo />
            </Paper>
        </Stack>
    )
}

export default Green
