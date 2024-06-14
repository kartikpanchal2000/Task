const express= require('express');
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');

const app=express();

// app.set('view enginer','ejs');
// app.use(express.static('public'));
//app.use(bodyParser.urlencoded({extended: true}));

//DB Connection
mongoose.connect('mongodb://localhost:27017/userMedia',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use('/',userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


