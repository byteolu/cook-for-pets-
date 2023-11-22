import { Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const { userInputCondition, userInputCuisine } = await request.json();

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 500,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that creates dog-friendly balanced meals."
                },
                {
                    role: "user",
                    content: `Generate a balanced (Protein: meat, seafood, dairy or egg. Fat: from meats and oils. Carbohydrates- sweet potatoes, are a great source of starch and fiber. These may be a better option to highly refined grains and white rice.Vitamins and minerals: Vitamin A, vitamin D, vitamin E, vitamin K, B-complex vitamins, calcium, and phosphorus.) homemade dog food recipe. Condition: ${userInputCondition}. Cuisine: ${userInputCuisine}.`
                }
            ]
        });

        // Parse the JSON response from the OpenAI API
        const data = await response.json();

        return new Response(JSON.stringify({ recipe: data.choices[0].message.content }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to generate recipe' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
