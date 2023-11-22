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
        max_tokens: 4096, // No max tokens: supe short / cut off response.
        messages: [ /// GPT-4 with Vision is JUST GPT-4 so you can still talk with it like regular gpt
                        // There is no "system" message - to tell the gpt how to act ( may change - current date Nov 17 , 2023)
            {
                role: "user",
                //@ts-ignore
                content: [
                    { type: "text", text: "Create short Ad Copy that triggers an emotional response, based on the iamge,  use the following rules to create. Attention : grab there attention .Interest them a with testimonials , numbers, uses , examples.Desire - make them come to the conclusion that they want this .Action :tell them exactly how to buy , click a button , reply to email.Also ommunicate your message effectively without unnecessary verbosity." },
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