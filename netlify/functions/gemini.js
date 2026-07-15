exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { cardName, category } = JSON.parse(event.body);
        
        // ดึง API Key จาก Netlify Environment Variables
        const apiKey = process.env.GEMINI_API_KEY; 

        const prompt = `คุณคือแม่หมอไพ่ยิปซีที่เชี่ยวชาญ ตอนนี้ลูกดวงเปิดได้ไพ่ "${cardName}" และต้องการดูดวงเรื่อง "${category}" ช่วยทำนายดวงให้หน่อย ขอแบบลึกลับ น่าติดตาม ให้กำลังใจ และใช้ภาษาที่เป็นกันเอง ความยาวประมาณ 2-3 บรรทัดพอ`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ reading: text })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "พลังงานจักรวาลขัดข้องชั่วคราว" })
        };
    }
}