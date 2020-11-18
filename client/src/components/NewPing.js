import React from 'react'
import { useMutation } from '@apollo/client';
import { Paper, Button, ButtonGroup, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { CREATE_PING, FETCH_PINGS_QUERY } from '../utils/graphql';
import { useForm } from '../utils/useForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  },
  buttonGroup: {
    marginLeft: '1rem',
  }
}));

export default function NewPing() {
  const classes = useStyles();
  const initialState = {body: ''}
  const { handleChange, handleSubmit, values } = useForm(createPingCb, initialState);

  const [createPing, ] = useMutation(CREATE_PING, {
    variables: values,
    onError(err) {
      console.log(err);
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PINGS_QUERY,
      })
      proxy.writeQuery({
        query: FETCH_PINGS_QUERY,
        data: {
          getPings: [result.data.createPing, ...data.getPings]
        }
      })
      values.body = ''
    }
  })

  function createPingCb() {
    createPing();
  }

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center" justify="center">
        <form style={{display: 'flex'}} onSubmit={handleSubmit}>
          <Grid item xs={10}>
            <TextField name="body" value={values.body} onChange={handleChange} rowsMax="3" multiline fullWidth/>
          </Grid>
          <Grid item xs={2} >
            <ButtonGroup size="small" className={classes.buttonGroup}>
              <Button endIcon={<CloudUploadIcon />}>Upload</Button>
              <Button type="submit" endIcon={<SendIcon />}>Ping</Button>
            </ButtonGroup>
          </Grid>
        </form>
      </Grid>
    </Paper>
  )
}
