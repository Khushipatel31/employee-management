const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const { errorHandler } = require("./middleware/errorHandling.js");
const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const commonController = require('./controllers/commonController.js')
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.post('/api/v1/login', commonController.loginUser)
app.post('/api/v1/forgotPassword', commonController.forgotPassword)
app.put('/api/v1/resetPassword/:token', commonController.resetPassword)

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);

require("./utils/dbConfig.js").getDBConnection();

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at port ${port} `);
});
