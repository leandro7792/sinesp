import express from 'express';
import { search } from 'sinesp-api';

const server = express();
server.use(express.json());

server.get('/:plate', async (req, res) => {
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

server.listen(3333, () => {
  console.log('Server start');
});
