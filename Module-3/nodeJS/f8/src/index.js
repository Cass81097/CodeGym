import path from 'path';
import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './img')));

// HTTP logger
app.use(morgan('combined'));

// Template engine 
app.engine('hbs', handlebars({
    extname: '.hbs'
}))

app.set('view engine', 'hbs');
app.set('view', path.join(__dirname, './views'))

app.get('/', (req, res) => {
    res.render('home'); 
})

app.listen(port, () => console.log('Success!'));