import React from 'react';
import Logo from '../../Image/Logo.png'
import { AppBar, Toolbar, Typography, Button,  } from '@material-ui/core';



const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

export default props =>
        <div style ={styles.root}>
            <AppBar position="absolute">
                <Toolbar>
                    <img width="50" height="50" alt="abc" src={Logo}/>
                    <Typography variant="h6" color="inherit" style={styles.grow}>
                        QLCSVC
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>




