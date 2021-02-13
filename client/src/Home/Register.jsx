import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useRegister } from '../Services/authenticationService';
import logo from '../Assets/logo.png';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(-2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 570,
        borderRadius: 10,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),marginTop: theme.spacing(2),
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
    forgotlink: {
        margin: '0 auto',
        marginLeft: 135,
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
        marginTop: theme.spacing(-4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
}));

const Register = props => {
    const register = useRegister();
    const classes = useStyles();

    return (
        <div>
            <Link href="/" className={classes.images}>
                        <img src={logo} alt="Logo" style={{height: 199, width: 220 }}/></Link>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item>
                        <Typography component="h1" variant="h5" align="center" style={{ marginTop: '20px'}}>
                            Register
                        </Typography>
                        <Formik
                            initialValues={{
                                name: '',
                                username: '',
                                password: '',
                                password2: '',
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .required('Name is required')
                                    .max(40, 'Too Long!')
                                    .min(
                                        6,
                                        'Name should be at least 6 characters long'
                                    ),
                                username: Yup.string()
                                    .required('Username is required')
                                    .max(40, 'Username address too long')
                                    .min(
                                        6,
                                        'Username should be at least 6 characters long'
                                    ),
                                password: Yup.string()
                                    .required('Password is Required')
                                    .max(100, 'Password too long')
                                    .min(
                                        6,
                                        'Password should be at least 6 characters long'
                                    ),
                                password2: Yup.string().oneOf(
                                    [Yup.ref('password'), null],
                                    'Passwords do not match'
                                ),
                            })}
                            onSubmit={(
                                { name, username, password, password2 },
                                { setStatus, setSubmitting }
                            ) => {
                                setStatus();
                                register(name, username, password, password2).then(
                                    user => {
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
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={classes.form}
                                >
                                    <TextField
                                        id="name"
                                        className={classes.textField}
                                        name="name"
                                        label="Name"
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        value={values.name}
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
                                        helperText={ touched.name ? errors.name : '' }
                                        error={ touched.name && Boolean(errors.name) } 
                                    />

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
                                        value={values.password}
                                        onChange={handleChange}
                                        type="password"
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
                                        helperText={ touched.password ? errors.password : '' }
                                        error={ touched.password && Boolean(errors.password) } 
                                    />

                                    <TextField
                                        id="password2"
                                        className={classes.textField}
                                        name="password2"
                                        label="Confirm Password"
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        value={values.password2}
                                        onChange={handleChange}
                                        type="password"
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
                                        Register
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                                <Link className={classes.forgotlink}
                                    onClick={() => props.handleClick('login')}
                                    href="#"
                                >
                                    Already have an account?
                                </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Register;
