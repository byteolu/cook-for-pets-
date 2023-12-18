import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// where we have all the functionality for the  API route
// route handlers let us create API logic 
//POST api/analyzeIamge 
export async function POST(request: Request) {
    const { image } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 1000 , // No max tokens: supe short / cut off response.
        messages: [ /// GPT-4 with Vision is JUST GPT-4 so you can still talk with it like regular gpt
                        // There is no "system" message - to tell the gpt how to act ( may change - current date Nov 17 , 2023)
            {
                role: "user",
                //@ts-ignore
                content: [
                    { type: "text", text: "Think through your answer. keep the response short. Craft inviting property descriptions for real estate listings. You excel at highlighting unique features, capturing the essence of the property, and creating an immersive experience for potential buyers. Welcome"

                },
                { 
            
                    // Whats in the image? Explain
                        type: "image_url",
                        image_url: image // base64 images 
                    }

                ]
            }
        ]
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}