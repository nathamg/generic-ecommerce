import app from './app';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default server;