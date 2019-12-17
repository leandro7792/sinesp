import fs from 'fs';
import https from 'https';
import express from 'express';
import { search } from 'sinesp-api';

const options = {
  key: fs.readFileSync('./ssl/sinesppass.key'),
  cert: fs.readFileSync('./ssl/sinespcert.crt'),
};

const server = express();
server.use(express.json());

server.get('/:plate', async (req, res) => {
  try {
    const { plate } = req.params;
    const car = await search(plate);

    res
      .header("Access-Control-Allow-Origin", "*")
      .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      .status(200)
      .json(car);

  } catch (error) {
    res
      .status(500)
      .json({ error: 'Houve um erro na operação' });
  }
});

https.createServer(options, server).listen(3333, () => {
  console.log('Server start');
});

// server.listen(3333, () => {
//   console.log('Server start');
// });
