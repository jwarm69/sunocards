'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { RecipientForm, MusicStyleSelector, ThemeSelector, OccasionSelector } from '@/components/forms';
import { CardPreview } from '@/components/cards';
import { CreateCardInput, createCardSchema } from '@/lib/validators';
import { MusicStyle, ThemeId, OccasionType, OCCASIONS } from '@/types';

type Step = 'occasion' | 'details' | 'style' | 'theme' | 'preview';

const STEPS: { id: Step; title: string; description: string }[] = [
  { id: 'occasion', title: 'Occasion', description: 'What are we celebrating?' },
  { id: 'details', title: 'Recipient Details', description: 'Tell us about them' },
  { id: 'style', title: 'Music Style', description: 'Choose the perfect genre' },
  { id: 'theme', title: 'Card Theme', description: 'Pick a beautiful design' },
  { id: 'preview', title: 'Preview & Create', description: 'Review and generate' },
];

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('occasion');
  const [formData, setFormData] = useState<Partial<CreateCardInput>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof CreateCardInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const validateStep = (step: Step): boolean => {
    const newErrors: Partial<Record<keyof CreateCardInput, string>> = {};

    if (step === 'occasion') {
      if (!formData.occasion) newErrors.occasion = 'Please select an occasion';
    } else if (step === 'details') {
      if (!formData.recipientName) newErrors.recipientName = 'Recipient name is required';
      if (!formData.relationship) newErrors.relationship = 'Relationship is required';
      if (!formData.personalityTraits?.length) newErrors.personalityTraits = 'Add at least one trait';
      if (!formData.interests?.length) newErrors.interests = 'Add at least one interest';
      if (!formData.senderName) newErrors.senderName = 'Your name is required';
    } else if (step === 'style') {
      if (!formData.musicStyle) newErrors.musicStyle = 'Please select a music style';
    } else if (step === 'theme') {
      if (!formData.themeId) newErrors.themeId = 'Please select a card theme';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const handleSubmit = async () => {
    // Validate full form
    const result = createCardSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CreateCardInput, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CreateCardInput;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create card
      const createResponse = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!createResponse.ok) {
        const error = await createResponse.json();
        throw new Error(error.message || 'Failed to create card');
      }

      const { card } = await createResponse.json();

      // Navigate to preview page
      router.push(`/preview/${card.id}`);
    } catch (error) {
      console.error('Error creating card:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build preview card data
  const previewCard = {
    recipient_name: formData.recipientName,
    personality_traits: formData.personalityTraits,
    interests: formData.interests,
    relationship: formData.relationship,
    music_style: formData.musicStyle,
    theme_id: formData.themeId,
    occasion: formData.occasion || 'birthday',
    custom_message: formData.customMessage,
    sender_name: formData.senderName,
  };

  const occasionConfig = OCCASIONS[formData.occasion || 'birthday'];

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4">
          <span>←</span>
          <span>Back to home</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Create Your {occasionConfig.name} Card {occasionConfig.emoji}
        </h1>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                  index <= currentStepIndex
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-3 hidden md:block">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`hidden md:block w-16 lg:w-24 h-1 mx-4 rounded-full ${
                    index < currentStepIndex ? 'bg-purple-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card variant="elevated" className="h-fit">
            <CardHeader>
              <CardTitle>{STEPS[currentStepIndex].title}</CardTitle>
              <CardDescription>{STEPS[currentStepIndex].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 'occasion' && (
                <OccasionSelector
                  value={formData.occasion}
                  onChange={(occasion: OccasionType) => setFormData({ ...formData, occasion })}
                  error={errors.occasion}
                />
              )}

              {currentStep === 'details' && (
                <RecipientForm
                  data={formData}
                  onChange={setFormData}
                  errors={errors}
                />
              )}

              {currentStep === 'style' && (
                <MusicStyleSelector
                  value={formData.musicStyle}
                  onChange={(style: MusicStyle) => setFormData({ ...formData, musicStyle: style })}
                  error={errors.musicStyle}
                />
              )}

              {currentStep === 'theme' && (
                <ThemeSelector
                  value={formData.themeId}
                  onChange={(theme: ThemeId) => setFormData({ ...formData, themeId: theme })}
                  error={errors.themeId}
                />
              )}

              {currentStep === 'preview' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Ready to Create!</h3>
                    <p className="text-purple-700 text-sm">
                      Your {occasionConfig.name.toLowerCase()} card will be created for{' '}
                      <strong>{formData.recipientName}</strong>.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{occasionConfig.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900">Occasion</p>
                        <p className="text-gray-600 text-sm">{occasionConfig.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎵</span>
                      <div>
                        <p className="font-medium text-gray-900">Music Style</p>
                        <p className="text-gray-600 text-sm capitalize">
                          {formData.musicStyle?.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎨</span>
                      <div>
                        <p className="font-medium text-gray-900">Card Theme</p>
                        <p className="text-gray-600 text-sm capitalize">{formData.themeId}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">✨</span>
                      <div>
                        <p className="font-medium text-gray-900">Personalization</p>
                        <p className="text-gray-600 text-sm">
                          {formData.personalityTraits?.join(', ')}
                          {formData.interests?.length ? ` • ${formData.interests.join(', ')}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                {currentStepIndex > 0 ? (
                  <Button variant="ghost" onClick={handleBack}>
                    ← Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep === 'preview' ? (
                  <Button onClick={handleSubmit} isLoading={isSubmitting}>
                    Create Card 🎉
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Continue →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="hidden md:block">
            <div className="sticky top-8">
              <p className="text-sm font-medium text-gray-500 mb-4 text-center">Live Preview</p>
              <CardPreview card={previewCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
