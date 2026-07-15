exports.handler = async (event) => {
    try {
        const { cardName } = JSON.parse(event.body);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "ทำนายไพ่ " + cardName + " ให้หน่อย" }] }] })
        });
        
        const data = await response.json();
        
        // แก้ไขส่วนนี้เพื่อป้องกัน Error 'reading 0'
        let aiText = "ไม่มีข้อมูลจาก AI ครับ";
        if (data.candidates && data.candidates.length > 0) {
            aiText = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            aiText = "Error จาก Google: " + data.error.message;
        }
        
        return { statusCode: 200, body: JSON.stringify({ text: aiText }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ text: "Error: " + error.message }) };
    }
};
