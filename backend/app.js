const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const contactRoutes = require('./routes/contact.routes');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000; // ✅ dynamic


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.use('/identify', contactRoutes);

app.get('/', (req, res) => {
  res.render('form');
});



