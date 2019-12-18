import fs from 'fs';
import https from 'https';
import express from 'express';
import { search } from 'sinesp-api';

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/lpr.letmein.com.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/lpr.letmein.com.br/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/lpr.letmein.com.br/chain.pem'),
};

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:plate', async (req, res) => {
  try {
    const { plate } = req.params;
    const car = await search(plate);

    res
      .status(200)
      .json(car);

  } catch (error) {
    res
      .status(500)
      .json({ error: 'Houve um erro na operação' });
  }
});

https.createServer(options, app).listen(3333, () => {
  console.log('Server start');
});
