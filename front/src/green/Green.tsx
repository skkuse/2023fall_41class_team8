import { List, Paper, Stack } from "@mui/material"
import mockData from "./mock"

const Green = () => {
    console.log(mockData);
    
    return (
        <Stack style={{ paddingTop: "16px", paddingLeft: "16px" }} direction="row" spacing={2}>
            <Paper style={{ flex: 1, borderRadius: '12px', height: "100vh" }}>
                <List
                >
                    <>
                        {mockData.map((item) => {
                            <div onClick={() => console.log(item)
                            }>
                                <span style={{ color: "black" }}>{item.name}</span>
                            </div>

                        })}
                    </>
                    
                </List>
            </Paper>
            <Paper style={{ flex: 9, borderRadius: '12px', height: "100vh" }}>상세 정보</Paper>
        </Stack>
    )
}

export default Green
