const express = require("express");
const cors = require("cors");
const cookieParser=require('cookie-parser')
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandling.js");
const adminRoutes=require('./routes/adminRoutes.js');
const userRoutes=require('./routes/userRoutes.js');
const commonController=require('./controllers/commonController.js')
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.post('/login',commonController.loginUser)

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user',userRoutes);

require("./utils/dbConfig.js").getDBConnection();

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});
