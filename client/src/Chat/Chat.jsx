import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Conversations from './Conversations';
import Users from './Users';
import backgroundMain from '../Assets/myBackground.jpg';

const useStyles = makeStyles(theme => ({
    paper: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        marginTop: -540,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        height: 380,
        backgroundColor: '#3a9c93'
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: '#3a9c93',
        color:  '#3a9c93',
    },
    subheaderText: {
        color: '#3a9c93',
    },
    menuList: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop: -300,
        borderBottom: 1,
        backgroundColor: 'transparent',
    },
}));

const Chat = props => {
    const [scope, setScope] = useState('Global Chat');
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState(null);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (e, newVal) => {
        setTab(newVal);
    };

    return (
        <React.Fragment>
            <Header />
            <Grid container>
                <img src={backgroundMain} alt="backgroundMain"/>
                <Grid item className={classes.paper}>
                    <BottomNavigation className={classes.menuList} 
                        style={{ borderBottom: '0.1em solid black', padding: '0.5em' }}
                        color="#FFF"
                        value={value}
                        onChange={(event, newValue) => {setValue(newValue);}}
                        showLabels
                        >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />}/>
                        <BottomNavigationAction label="Favorites" icon={<RestoreIcon />}/>
                        <BottomNavigationAction label="Nearby" icon={<RestoreIcon />}/>
                        <BottomNavigationAction label="Nearby" icon={<RestoreIcon />}/>
                    </BottomNavigation>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;
