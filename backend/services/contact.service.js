// Placeholder for contact.service.js
const db = require('../db');

const processContact = async (email, phoneNumber) => {
  const query = `
    SELECT * FROM Contact
    WHERE (email = $1 OR phoneNumber = $2)
    ORDER BY createdAt ASC
  `;
  const { rows: contacts } = await db.query(query, [email, phoneNumber]);

  let primary = contacts.find(c => c.linkpreference === 'primary') || contacts[0];

  if (!primary) {
    const insert = `
      INSERT INTO Contact (email, phoneNumber, linkPrecedence)
      VALUES ($1, $2, 'primary')
      RETURNING *
    `;
    const { rows } = await db.query(insert, [email, phoneNumber]);
    const newContact = rows[0];

    return {
      primaryContatctId: newContact.id,
      emails: [newContact.email].filter(Boolean),
      phoneNumbers: [newContact.phoneNumber].filter(Boolean),
      secondaryContactIds: []
    };
  }

  const match = contacts.some(c => c.email === email && c.phoneNumber === phoneNumber);
  if (!match) {
    await db.query(`
      INSERT INTO Contact (email, phoneNumber, linkPrecedence, linkedId)
      VALUES ($1, $2, 'secondary', $3)
    `, [email, phoneNumber, primary.id]);
  }

  const { rows: allRelated } = await db.query(`
    SELECT * FROM Contact
    WHERE id = $1 OR linkedId = $1
    ORDER BY createdAt ASC
  `, [primary.id]);

  const emails = [...new Set(allRelated.map(c => c.email).filter(Boolean))];
  const phones = [...new Set(allRelated.map(c => c.phonenumber).filter(Boolean))];
  const secondaryIds = allRelated.filter(c => c.linkpreference === 'secondary').map(c => c.id);

  return {
    primaryContatctId: primary.id,
    emails,
    phoneNumbers: phones,
    secondaryContactIds: secondaryIds
  };
};

module.exports = { processContact };
