import * as React from 'react';
import Appbar from "../MUI-components/Appbar";
import Drawerr from "../MUI-components/Drawerr";
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useMemo } from "react";

import getDesignTokens from "../styles/getDesignTokens";

const Root = () => {

    const drawerWidth = 240;

    const [myMode, setMyMode] = useState(localStorage.getItem("currentMode") === null ? "dark" : localStorage.getItem("currentMode") === "light" ? "light" : "dark");

    const darkTheme = useMemo(() => createTheme(getDesignTokens(myMode)), [myMode]);

    const theme = useTheme();

    const [noneORblock, setNoneORblock] = useState("none");

    const [drawerType, setDrawerType] = useState("permanent");

    const showDrawer = () => {
        setDrawerType("temporary");
        setNoneORblock("block");
    };

    const hideDrawer = () => {
        setDrawerType("permanent");
        setNoneORblock("none");
    };


    return (

        <ThemeProvider theme={darkTheme}>

            <CssBaseline />

            <div>

                {/* ------------------------------------------------------------ */}

                <Appbar drawerWidth={drawerWidth} showDrawer={showDrawer}/>

                {/* ------------------------------------------------------------ */}

                <Drawerr drawerWidth={drawerWidth} setMyMode={setMyMode} noneORblock={noneORblock} drawerType={drawerType} hideDrawer={hideDrawer} />

                {/* ------------------------------------------------------------ */}

                {/* sx={{  }} */}
                <Box component="main" sx={{
                    // [theme.breakpoints.down('sm')]: { display: "flex", justifyContent: "center" },
                    // [theme.breakpoints.up('sm')]: { marginLeft: `${drawerWidth}px`, display: "flex", justifyContent: "center" },
                    ml: { sm: `${drawerWidth}px` }, display: " flex", justifyContent: "center"
                }}>
                    <Outlet />
                </Box>

                {/* ------------------------------------------------------------ */}

            </div>

        </ThemeProvider>


    )
}
export default Root;