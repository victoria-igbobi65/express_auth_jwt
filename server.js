const app = require('./app')
require("dotenv").config();

require('./db').connectToMongoDB() // Connect to MongoDB

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});