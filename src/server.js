const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/products`);
});
