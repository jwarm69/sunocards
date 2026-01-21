import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createCardSchema } from '@/lib/validators';
import { createCard } from '@/lib/mock-db';
import { Card } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = createCardSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate unique IDs
    const id = nanoid(21);
    const shareId = nanoid(12);

    // Create card record
    const card: Card = {
      id,
      share_id: shareId,
      recipient_name: data.recipientName,
      personality_traits: data.personalityTraits,
      interests: data.interests,
      relationship: data.relationship,
      music_style: data.musicStyle,
      theme_id: data.themeId,
      custom_message: data.customMessage || '',
      sender_name: data.senderName,
      sender_email: data.senderEmail,
      song_status: 'complete', // Mark as complete for demo (no song needed)
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    createCard(card);

    return NextResponse.json({
      success: true,
      card: {
        id: card.id,
        shareId: card.share_id,
        status: card.song_status,
      },
    });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
