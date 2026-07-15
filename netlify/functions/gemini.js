exports.handler = async (event) => {
    try {
        const { cardName } = JSON.parse(event.body);
        const API_KEY = "AIzaSyBc9-pEXgF_38cAEBV17zB2L-Tl4T_ev5Y"; // ใส่ตรงนี้ไปเลยครับ
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
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
            body: JSON.stringify({ text: "Error: ไม่สามารถเชื่อมต่อกับ Google ได้" }) 
        };
    }
};
