exports.handler = async (event) => {
    const { cardName } = JSON.parse(event.body);
    const API_KEY = "AQ.Ab8RN6IHrDgT8IskCEofbGdAS7WmI3vctW4bRCu2qprbnvpgDg"; // วางคีย์ตรงนี้

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "ทำนายไพ่ " + cardName + " ให้หน่อย" }] }] })
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({ text: data.candidates[0].content.parts[0].text })
    };
};
