#!/usr/bin/env node

import express from 'express';
import axios from 'axios';
import open from 'open';
import querystring from 'querystring';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('client_id', {
    alias: 'c',
    description: 'Google client_id',
    type: 'string',
    demandOption: true
  })
  .option('client_secret', {
    alias: 's',
    description: 'Google client_secret',
    type: 'string',
    demandOption: true
  })
  .option('port', {
    alias: 'p',
    description: 'Port to run application, 5000 by default',
    type: 'number',
    default: 8000
  })
  .option('scope', {
    alias: 'o',
    description: 'OAuth scope (default is https://www.googleapis.com/auth/analytics.readonly)',
    type: 'string',
    default: 'https://www.googleapis.com/auth/analytics.readonly'
  })
  .help()
  .alias('help', 'h')
  .argv;

const app = express();
const port = argv.port;
const client_id = argv.client_id;
const client_secret = argv.client_secret;
const scope = argv.scope;
const GET_CODE_ENDPOINT = '/oauth';
let first_call_executed = false;

app.get('/', (req, res) => {
  res.send('ok');
});

app.get(GET_CODE_ENDPOINT, async (req, res) => {
  const response_data = req.query;
  if (response_data.error) {
    res.json({ message: "Failed to get authorization code from Google", error: response_data.error });
  } else {
    const parameters = {
      client_id: client_id,
      client_secret: client_secret,
      code: response_data.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://127.0.0.1:${port}${GET_CODE_ENDPOINT}`
    };
    const url = `https://oauth2.googleapis.com/token?${querystring.stringify(parameters)}`;
    const response = await axios.post(url);
    console.log(JSON.stringify(response.data, null, 4));
    res.json(response.data);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  if (!first_call_executed) {
    const parameters = {
      client_id: client_id,
      redirect_uri: `http://127.0.0.1:${port}${GET_CODE_ENDPOINT}`,
      response_type: 'code',
      scope: scope,
      access_type: 'offline',
      prompt: 'consent'
    };
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(parameters)}`;
    first_call_executed = true;
    open(url);
  }
});
