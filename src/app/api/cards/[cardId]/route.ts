import { NextRequest, NextResponse } from 'next/server';
import { getCardById, getCardByShareId, updateCard } from '@/lib/mock-db';

interface RouteParams {
  params: Promise<{ cardId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { cardId } = await params;

    // Try to find by ID or share_id
    let card = getCardById(cardId);
    if (!card) {
      card = getCardByShareId(cardId);
    }

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      card: {
        id: card.id,
        shareId: card.share_id,
        recipientName: card.recipient_name,
        personalityTraits: card.personality_traits,
        interests: card.interests,
        relationship: card.relationship,
        musicStyle: card.music_style,
        themeId: card.theme_id,
        occasion: card.occasion || 'birthday',
        customMessage: card.custom_message,
        senderName: card.sender_name,
        senderEmail: card.sender_email,
        songStatus: card.song_status,
        songUrl: card.song_url,
        lyrics: card.lyrics,
        createdAt: card.created_at,
      },
    });
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { cardId } = await params;
    const body = await request.json();

    // Only allow updating specific fields
    const allowedFields = ['song_status', 'song_url', 'lyrics', 'suno_job_id'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const card = updateCard(cardId, updateData);

    if (!card) {
      return NextResponse.json(
        { error: 'Failed to update card' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      card: {
        id: card.id,
        songStatus: card.song_status,
        songUrl: card.song_url,
        lyrics: card.lyrics,
      },
    });
  } catch (error) {
    console.error('Error updating card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
