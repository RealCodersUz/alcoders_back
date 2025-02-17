const TelegramBot = require("node-telegram-bot-api");
const chatIds = [
  1551855614 /* @Real_Coder */, -1002292769502 /* Alcoders So'rovlar */,
];

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: false,
});

const FormSendMessage = async (req, res) => {
  try {
    const { name, phone, message, productName } = req.body;

    console.log(req.body, "req body");

    // Get current date and time with Asia/Tashkent time zone
    const dateOptions = { timeZone: "Asia/Tashkent" };
    const currentDate = new Date().toLocaleDateString("en-US", dateOptions);
    const currentTime = new Date().toLocaleTimeString("en-US", dateOptions);

    // Send message to Telegram
    for (const chatId of chatIds) {
      await bot.sendMessage(
        chatId,
        `
        Alcoders.uz dan yangi xabar keldi: \n 
        <b>● Ismi: </b>${name} 
        <b>● Telefon Raqami: </b>${phone} 
        <b>● Mahsulot turi: </b>${productName}
        <b>● Xabar: </b>${message}
        <b>● Yuborilgan Sana : </b>${currentDate}
        <b>● Yuborilgan Soati : </b>${currentTime}`,
        { parse_mode: "HTML" }
      );
    }

    res.status(200).json({
      message: "Message sent successfully to all recipients.",
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

module.exports = {
  FormSendMessage,
};
