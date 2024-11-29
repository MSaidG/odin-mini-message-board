const express = require('express');
const indexRouter = require('./routers/indexRouter');
const usersRouter = require('./routers/usersRouter');
const {body, validationResult} = require('express-validator');

const app = express();
const PORT = (process.env.PORT || 8000); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(err.statusCode ||  500).send(err.message);
});


app.listen(PORT, () => {console.log(`Server running on port ${PORT}`); });