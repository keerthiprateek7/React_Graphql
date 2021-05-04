import React from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles,Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function Home() {

    let history = useHistory();
    const classes = useStyles();
    return (
        <div>
            <h1>Practice Test</h1>
            <p>This is the home page containing 2 buttons to redirect to the 2 other pages</p>
            <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={() => { history.push('/customers') }}>All Customers</Button>
            <Button variant="outlined" color="primary" onClick={() => { history.push('/activecustomers') }}>Active Customers</Button>
            </div>
        </div>
    )
}
