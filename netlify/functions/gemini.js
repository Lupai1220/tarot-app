exports.handler = async (event) => {
    try {
        const { cardName } = JSON.parse(event.body);
        
        // ใช้ fetch มาตรฐานของ Node.js (ไม่ต้อง require เพิ่ม)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "ทำนายไพ่ " + cardName + " ให้หน่อย" }] }] })
        });
        
        const data = await response.json();
        
        return { 
            statusCode: 200, 
            body: JSON.stringify({ text: data.candidates[0].content.parts[0].text }) 
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ text: "Error: " + error.message }) 
        };
    }
};
