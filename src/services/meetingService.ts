import axios from 'axios';
import { AppError } from '../utils/AppError';

export async function processMeetingNotes(text: string) {
  const prompt = `
You are an assistant that extracts meeting minutes.
Given the following meeting notes, extract:
1. A 2–3 sentence summary.
2. A list of key decisions.
3. A structured list of action items with task, owner (if mentioned), and deadline (if mentioned).

Return JSON with keys: summary, decisions[], actionItems[].

Meeting Notes:
${text}
`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=' + apiKey,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    const jsonString = content.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);

  } catch (err: any) {
    if (err.code === 'ECONNABORTED') {
      throw new AppError('Gemini API timeout. Please try again later.', 504);
    }
    if (err.response && err.response.status === 401) {
      throw new AppError('Invalid Gemini API key.', 401);
    }
    if (err.response && err.response.status === 429) {
       throw new AppError('Gemini API rate limit exceeded. Please wait and try again.', 429);
    }
   throw new AppError('Error communicating with Gemini API.', 502);
  }
}
