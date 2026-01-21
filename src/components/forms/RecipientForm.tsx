'use client';

import { Input, Select, TagInput, Textarea } from '@/components/ui';
import { CreateCardInput } from '@/lib/validators';

interface RecipientFormProps {
  data: Partial<CreateCardInput>;
  onChange: (data: Partial<CreateCardInput>) => void;
  errors?: Partial<Record<keyof CreateCardInput, string>>;
}

const RELATIONSHIP_OPTIONS = [
  { value: 'friend', label: 'Friend' },
  { value: 'best_friend', label: 'Best Friend' },
  { value: 'parent', label: 'Parent' },
  { value: 'child', label: 'Son/Daughter' },
  { value: 'sibling', label: 'Brother/Sister' },
  { value: 'spouse', label: 'Spouse/Partner' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'colleague', label: 'Colleague' },
  { value: 'boss', label: 'Boss' },
  { value: 'other', label: 'Other' },
];

export function RecipientForm({ data, onChange, errors }: RecipientFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Recipient's Name"
          placeholder="e.g., Sarah"
          value={data.recipientName || ''}
          onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
          error={errors?.recipientName}
        />
        <Select
          label="Your Relationship"
          placeholder="Select relationship..."
          options={RELATIONSHIP_OPTIONS}
          value={data.relationship || ''}
          onChange={(e) => onChange({ ...data, relationship: e.target.value })}
          error={errors?.relationship}
        />
      </div>

      <TagInput
        label="Personality Traits"
        placeholder="e.g., funny, adventurous, kind..."
        value={data.personalityTraits || []}
        onChange={(tags) => onChange({ ...data, personalityTraits: tags })}
        error={errors?.personalityTraits}
        helperText="Add words that describe them (press Enter after each)"
        maxTags={5}
      />

      <TagInput
        label="Interests & Hobbies"
        placeholder="e.g., cooking, hiking, music..."
        value={data.interests || []}
        onChange={(tags) => onChange({ ...data, interests: tags })}
        error={errors?.interests}
        helperText="What do they love doing?"
        maxTags={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          placeholder="e.g., John"
          value={data.senderName || ''}
          onChange={(e) => onChange({ ...data, senderName: e.target.value })}
          error={errors?.senderName}
        />
        <Input
          label="Your Email (optional)"
          type="email"
          placeholder="e.g., john@example.com"
          value={data.senderEmail || ''}
          onChange={(e) => onChange({ ...data, senderEmail: e.target.value })}
          error={errors?.senderEmail}
          helperText="We'll send you a copy of the card"
        />
      </div>

      <Textarea
        label="Personal Message (optional)"
        placeholder="Add a personal touch to your birthday card..."
        value={data.customMessage || ''}
        onChange={(e) => onChange({ ...data, customMessage: e.target.value })}
        error={errors?.customMessage}
        rows={3}
        helperText="This will appear on the card alongside the song"
      />
    </div>
  );
}
