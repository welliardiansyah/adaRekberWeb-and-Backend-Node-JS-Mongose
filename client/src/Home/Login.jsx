import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useLogin } from '../Services/authenticationService';
import logo from '../Assets/logo.png';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(-2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 470,
        borderRadius: 10,
    },
    form: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        flexDirection: 'row',
        width: 350,
        margin: '0 auto',
        marginLeft: 25,
        marginTop: 35,
        borderColor: '#3a9c93'
    },
    textError: {
        flexDirection: 'row',
        width: 350,
        margin: '0 auto',
        marginLeft: 35,
        marginTop: -20,
        borderColor: '#3a9c93',
        fontSize: '5px'
    },
    sigin: {
        margin: theme.spacing(5, 3, 2),
        width: 350,
        backgroundColor: '#3a9c93'
    },
    signup: {
        margin: theme.spacing(3, 3, 2),
        width: 350,
        backgroundColor: '#b6b6b6'
    },
    forgotlink: {
        margin: '0 auto',
        marginLeft: 150,
        marginRight: '0 auto',
        fontSize: 12,
        color: '#3a9c93'
    },
    cssLabel: {
        color: "#3a9c93"
      },
    
      cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
          borderColor: `${theme.palette.primary.main} !important`
        }
      },
    
      cssFocused: {},
    
      notchedOutline: {
        borderWidth: "1px",
        borderColor: "#3a9c93 !important"
      },
      images: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
}));

const Login = props => {
    const login = useLogin();
    const classes = useStyles();

    return (
        <div>
            <Link href="/" className={classes.images}>
                        <img src={logo} alt="Logo" style={{height: 199, width: 220 }}/></Link>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item>
                        <Typography component="h1" variant="h5" align="center" style={{ marginTop: '20px'}}>
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .required('Username is required')
                                    .max(40, 'Username is too long')
                                    .min(6, 'Username too short'),
                                password: Yup.string()
                                    .required('Password is required')
                                    .max(100, 'Password is too long')
                                    .min(6, 'Password too short'),
                            })}
                            onSubmit={(
                                { username, password },
                                { setStatus, setSubmitting }
                            ) => {
                                setStatus();
                                login(username, password).then(
                                    () => {
                                        const { from } = history.location.state || {
                                            from: { pathname: '/chat' },
                                        };
                                        history.push(from);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={classes.form}
                                >
                                    <TextField
                                        id="username"
                                        className={classes.textField}
                                        name="username"
                                        label="Username"
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        value={values.username}
                                        onChange={handleChange}
                                        InputProps={{
                                            classes: {
                                              focused: classes.cssFocused,
                                              notchedOutline: classes.notchedOutline
                                            },
                                            inputMode: "text"
                                          }}
                                    />

                                    <TextField
                                        className={classes.textError}
                                        type="hidden"
                                        helperText={ touched.username ? errors.username : '' }
                                        error={ touched.username && Boolean(errors.username) } 
                                    />

                                    <TextField
                                        id="password"
                                        className={classes.textField}
                                        name="password"
                                        label="Password"
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        error={
                                            touched.password &&
                                            Boolean(errors.password)
                                        }
                                        value={values.password}
                                        onChange={handleChange}
                                        type="password"
                                        InputProps={{
                                            classes: {
                                              focused: classes.cssFocused,
                                              notchedOutline: classes.notchedOutline
                                            },
                                            inputMode: "password"
                                          }}
                                    />
                                    
                                    <TextField
                                        className={classes.textError}
                                        type="hidden"
                                        helperText={ touched.password ? errors.password : '' }
                                        error={ touched.password && Boolean(errors.password) } 
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth={true}
                                        variant="contained"
                                        color="primary"
                                        className={classes.sigin}
                                    >
                                        Login
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography className={classes.forgotlink}>
                            <Link
                                onClick={() => props.handleClick('forgot')}
                                href="#"
                            >
                                Forgot Password!
                            </Link>
                        </Typography>

                        <Link
                                onClick={() => props.handleClick('register')}
                                href="#"
                            >
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.signup}
                            >
                                Register
                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Login;
