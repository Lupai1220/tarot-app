const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { cardName } = JSON.parse(event.body);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "ทำนายไพ่ " + cardName + " ให้หน่อย" }] }] })
        });
        
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        return { 
            statusCode: 200, 
            body: JSON.stringify({ text: aiText }) 
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ text: "ขออภัยครับ AI ตอบกลับมาไม่สมบูรณ์" }) 
        };
    }
};
