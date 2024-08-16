import * as React from 'react';
import { Toolbar, AppBar, Avatar, Link, Typography, useTheme, IconButton } from '@mui/material';
import { Menu } from "@mui/icons-material";

const Appbar = ({ drawerWidth, showDrawer }) => {

    // const theme = useTheme();

    return (
        <AppBar position="static" sx={{
            // [theme.breakpoints.up('sm')]: {
            //     marginLeft: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)`
            // },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { xs: 0, sm: `${drawerWidth}px` },
        }}>
            <Toolbar>
                <IconButton sx={{display:{sm: "none"}}} onClick={showDrawer}><Menu /></IconButton>
                <Link href="/" color="inherit" variant="h6" sx={{ flexGrow: 1, "&:hover": { fontSize: "22px" } }} underline='none'>My expenses</Link>
                {/* 2 = 2*8 = 16 px */}
                <Typography variant="body1" color="inherit" mr={2}>Noran</Typography>
                <Avatar alt="Noran" src="./images/avatar.jpeg" />
            </Toolbar>
        </AppBar>
    )
}

export default Appbar;