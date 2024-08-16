import * as React from 'react';
import { Drawer, useTheme, List, Divider, IconButton, styled, Badge } from '@mui/material';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Brightness7, Brightness4, Home } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const Drawerr = ({ drawerWidth, setMyMode, noneORblock, drawerType, hideDrawer }) => {

    const navigate = useNavigate();

    const theme = useTheme();

    const currentLocation = useLocation();

    // @ts-ignore
    const { selectedProducts } = useSelector((state) => state.carttt);

    const myList = [
        { text: "Home", icon: <Home />, path: "/" },
        {
            text: "Cart",
            icon:
                <StyledBadge badgeContent={selectedProducts.length} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>,
            path: "/cart"
        },
    ];

    return (
        <Drawer
            sx={{
                width: `${drawerWidth}px`,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: `${drawerWidth}px`,
                    boxSizing: 'border-box',
                },
                display: { xs: noneORblock, sm: "block" }
            }}
            variant={drawerType}
            anchor="left"
            open={true}
            onClose={hideDrawer}
        >
            {/* ------------------------------------------------------------ */}
            <List>

                <ListItem sx={{ display: "flex", justifyContent: "center", mb: "14px" }} disablePadding>
                    <IconButton onClick={() => {
                        localStorage.setItem("currentMode", theme.palette.mode === "light" ? "dark" : "light")
                        setMyMode(theme.palette.mode === "light" ? "dark" : "light");
                    }} color="inherit">
                        {theme.palette.mode === "dark" ? <Brightness7 sx={{ color: "orange" }} /> : <Brightness4 />}
                    </IconButton>
                </ListItem>

                <Divider />


                {myList.map((item) => {
                    return (
                        <ListItem disablePadding sx={{
                            backgroundColor: currentLocation.pathname === item.path ? theme.palette
                                // @ts-ignore
                                .favColor.main : null
                        }} key={item.text}>
                            <ListItemButton onClick={() => { navigate(item.path); }}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

            </List>
            {/* ------------------------------------------------------------ */}
        </Drawer >
    )
}

export default Drawerr;