const pool = require("./pool");

async function selectAllMessages() {
  try {
    const result = await pool.query("SELECT * FROM messages");
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

async function selectMessageById(id) {
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function insertMessage(message) {
  try {
    const result = await pool.query(
      "INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING *",
      [message.text, message.username]
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  selectAllMessages,
  selectMessageById,
  insertMessage,
};
