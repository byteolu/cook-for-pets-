import { Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const { propertyFeatures, propertyAddress  } = await request.json();

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant skilled in crafting vivid, detailed, and inviting property descriptions for real estate listings. You excel at highlighting unique features, capturing the essence of the property, and creating an immersive experience for potential buyers.Keep in at max 1200 charecters"
                },
                {
                    role: "user",
                    content: `Create a detailed and engaging property description for the following address: ${propertyAddress}. Features: ${propertyFeatures}.`
                }
            ]
        });

        // Parse the JSON response from the OpenAI API
        const data = await response.json();

        return new Response(JSON.stringify({ description: data.choices[0].message.content }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to generate listing description' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
