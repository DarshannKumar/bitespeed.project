const express = require('express');
const router = express.Router();
const { identifyContact  } = require('../controllers/contact.controller');


router.post('/', identifyContact);


// router.get('/all', getAllContacts);

module.exports = router;
// app.get("/", (req, res) => {
//   res.send("✅ Server is alive");
//   console.log("server started");
// });
