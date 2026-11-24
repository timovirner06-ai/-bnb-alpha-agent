require('dotenv').config();
const axios = require('axios');

// عنوان API العام لأسعار Binance
const BINANCE_API = 'https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT';

async function checkPrice() {
    console.log(`\n[+] Checking BNB price at ${new Date().toLocaleTimeString()}...`);
    try {
        const response = await axios.get(BINANCE_API);
        const price = parseFloat(response.data.price);
        console.log(`[+] Current BNB Price: $${price.toFixed(2)}`);

        // شرط التنبيه (مثال: إذا تجاوز السعر 600 دولار)
        if (price > 600) {
            console.log(`[🚀] ALERT: BNB price is above $600!`);
            // هنا يمكنك إضافة كود لإرسال إشعار
        } else {
            console.log(`[⏳] Price is below threshold. Waiting...`);
        }
    } catch (error) {
        console.error(`[!] Error fetching price:`, error.message);
    }
}

// تشغيل الدالة كل 10 ثوانٍ
setInterval(checkPrice, 10000);
checkPrice(); // تشغيل فوري عند البدء
