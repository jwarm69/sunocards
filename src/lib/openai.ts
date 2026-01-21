import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface LyricsGenerationParams {
  recipientName: string;
  personalityTraits: string[];
  interests: string[];
  relationship: string;
  senderName: string;
  musicStyle: string;
}

/**
 * Generate personalized birthday song lyrics using GPT-4
 */
export async function generateLyrics(params: LyricsGenerationParams): Promise<string> {
  const { recipientName, personalityTraits, interests, relationship, senderName, musicStyle } = params;

  const prompt = `Write birthday song lyrics for someone named ${recipientName}.

Details about the recipient:
- Personality traits: ${personalityTraits.join(', ')}
- Interests/hobbies: ${interests.join(', ')}
- The sender's relationship to them: ${relationship}
- Sender's name: ${senderName}
- Music style: ${musicStyle}

Guidelines:
- Write 2-3 verses and a catchy chorus
- Keep it heartfelt and celebratory
- Include the recipient's name naturally in the lyrics
- Reference their personality or interests where appropriate
- Keep lyrics appropriate for all ages
- Format: Verse 1, Chorus, Verse 2, Chorus (optional: Bridge, Final Chorus)
- Each section should be 4-6 lines
- Make it memorable and personal

Output ONLY the lyrics, no commentary or labels.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a talented songwriter who writes personalized, heartfelt birthday songs. Your lyrics are catchy, appropriate for all ages, and capture the unique personality of the recipient.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  const lyrics = completion.choices[0]?.message?.content;

  if (!lyrics) {
    throw new Error('Failed to generate lyrics');
  }

  return lyrics.trim();
}
