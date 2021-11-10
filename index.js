const express = require('express');
const rootRouter = require('./routers');
const app = express();

// prort
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
//test App
app.get('/test', (req, res) => {
  res.send('testAP')
})

// body json
app.use(express.json());
app.use('/api', rootRouter)