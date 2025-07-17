const { processContact } = require('../services/contact.service');

const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'email or phoneNumber required' });
    }

    const contactInfo = await processContact(email, phoneNumber);

    res.render('index', {
      contact: contactInfo,
    });
  } catch (err) {
    console.error('🔥 Error in identifyContact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports ={identifyContact };
