
export async function ChatBot(req, res) {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an Agriculture Assistant Bot. Only answer questions related to agriculture, farming, crops, weather, market prices, soil, irrigation, pesticides, fertilizers, organic farming, etc. Politely refuse to answer non-agriculture questions.",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
                max_tokens: 100,
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (data?.error) {
            console.error("OpenRouter Error:", data.error);
            return res.status(500).json({ success: false, message: "Model error occurred." });
        }

        const reply = data.choices?.[0]?.message?.content?.trim() || "No response from model.";

        return res.status(200).json({
            success: true,
            message: reply,
        });
    } catch (error) {
        console.error("OpenRouter API Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to generate response from OpenRouter",
        });
    }
}

export async function PersonalizedAdviceBot(req, res) {
    const { message, category } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    let systemPrompt = "You are an expert agriculture assistant bot. Only respond to agriculture-related queries like crops, weather, market prices, soil,agriculture finaces etc.Provide concise, helpful, and complete responses in plain text only. Do not use markdown unless specifically requested.";
    const categoryPrompts = {
        crops: "You specialize in helping farmers choose the right crops based on region, soil, and season.",
        soil: "You provide advice on improving and maintaining soil health, including nutrients, pH, and composition.",
        pests: "You assist with identifying and managing pests and crop diseases using eco-friendly and effective solutions.",
        season: "You offer seasonal planting tips, including crop calendars and best practices for each time of year.",
        water: "You guide farmers on proper irrigation methods, water conservation, and scheduling for efficient crop growth.",
        organic: "You help farmers adopt organic farming practices, avoid chemical use, and transition to sustainable methods.",
    };
    if (category && categoryPrompts[category]) {
        systemPrompt = `You are an expert agriculture assistant bot. ${categoryPrompts[category]} Only answer agriculture-related queries.`;
    }
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
                max_tokens: 5000,
                temperature: 0.5,
                stop: ["\n", "End of response"],
            }),
        });

        const data = await response.json();

        if (data?.error) {
            console.error("OpenRouter Error:", data.error);
            return res.status(500).json({ success: false, message: "Model error occurred." });
        }

        const reply = data.choices?.[0]?.message?.content?.trim() || "No response from model.";

        return res.status(200).json({
            success: true,
            message: reply,
        });
    } catch (error) {
        console.error("OpenRouter API Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to generate response from OpenRouter",
        });
    }
}

