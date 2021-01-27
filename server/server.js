require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: process.env.PROXY_ORIGIN }));


// app.use(express.static(__dirname + '/../client/public'));
app.use('/', express.static(__dirname + '/../client/public'));
app.use('/bundle', cors(), express.static(__dirname + '/../client/public/bundle.js'));

const PORT = process.env.PORT || 3001;

app.get('/lodge', (req, res) => {
  console.log(`req.query.id ${req.query.id }`)
  const id = req.query.id;

  console.log(db);

  db.getLodgingById(id)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  })

  // res.json( {
  //   "id" : "1000",
  //   "city" : "Ada",
  //   "country" : "United States",
  //   "description" : "Ada witch - Sometimes you can see a misty blue figure floating within a 3-mile radius of the Ada Cemetery on 2 Mile ,between Egypt Valley and Honey Creek. The story of her origin is as follows: A man suspected his wife of having an affair, so he followed her late one night when she thought he was asleep. Sure enough, she went to a field near their property where she met her lover. The husband was enraged and killed his wife, which resulted in a struggle with the other man. Both men died from their injuries. It is said that late at night (especially during the night of and the nights preceding a full moon) people driving by the field can see her ghost, searching for her lover. Some people have reported stopping to try to communicate with her, but she always disappears or runs into the woods where she cannot be followed (due to the thick brambles that inhabit the area). She is said to dress in a long white gown which authorities say dates her to the turn of the 20th century. Usually she is seen alone, but sometimes witnesses report seeing a ghostly death scene re-enacted... Others report seeing nothing at all but hearing the killer's shouts of rage followed by the victims' screams of agony... Although it is said she haunts the field on Honeycreek Road where she died, other witnesses have reported her in nearby Seidman Park, and in nearby Findlay Cemetery, where she is supposedly buried. This story was actually featured in the book 'Ghosts of Grand Rapids.",
  //   "name" : "Ada Cemetery",
  //   "state" : "Michigan",
  //   "state_abbrev" : "MI",
  //   "longitude" : "-85.5048931",
  //   "latitude" : "42.9621061",
  //   "location_2" : "POINT(-85.50489309999999 42.9621061)",
  //   "city_longitude" : "-85.4954803",
  //   "city_latitude" : "42.960727",
  //   "city_location" : "POINT(-85.4954803 42.960727)",
  //   "guests" : "8",
  //   "bedrooms" : "2",
  //   "beds" : "8",
  //   "baths" : "2",
  //   "price" : "83",
  //   "host_id" : "1000"
  // }
  // );

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
