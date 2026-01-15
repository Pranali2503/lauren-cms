import type { Schema, Struct } from '@strapi/strapi';

export interface ContentAnswerOption extends Struct.ComponentSchema {
  collectionName: 'components_content_answer_options';
  info: {
    displayName: 'answer-option';
  };
  attributes: {
    explanation: Schema.Attribute.Text;
    is_correct: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentAuthorBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_author_blocks';
  info: {
    displayName: 'author_block';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface ContentCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_cta_blocks';
  info: {
    displayName: 'cta-block';
  };
  attributes: {
    action_type: Schema.Attribute.Enumeration<['start', 'continue', 'finish']>;
    label: Schema.Attribute.String;
    target_url: Schema.Attribute.String;
  };
}

export interface ContentEmbedBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_embed_blocks';
  info: {
    displayName: 'embed-block';
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['video', 'animation']>;
    url: Schema.Attribute.String;
    video: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ContentImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_image_blocks';
  info: {
    displayName: 'image-block';
  };
  attributes: {
    Caption: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ContentProgressBar extends Struct.ComponentSchema {
  collectionName: 'components_content_progress_bars';
  info: {
    displayName: 'progress_bar';
  };
  attributes: {
    percent: Schema.Attribute.Integer;
    step: Schema.Attribute.Integer;
    total_steps: Schema.Attribute.Integer;
  };
}

export interface ContentQuestionBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_question_blocks';
  info: {
    displayName: 'Question-block';
  };
  attributes: {
    allow_multiple: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    help_text: Schema.Attribute.Text;
    options: Schema.Attribute.Component<'content.answer-option', true>;
    question: Schema.Attribute.Text;
  };
}

export interface ContentRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_text_blocks';
  info: {
    displayName: 'Rich-text-block';
  };
  attributes: {
    Body: Schema.Attribute.Blocks;
  };
}

export interface ContentSectionBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_section_blocks';
  info: {
    displayName: 'section-block';
  };
  attributes: {
    key: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentStatHighlight extends Struct.ComponentSchema {
  collectionName: 'components_content_stat_highlights';
  info: {
    displayName: 'stat-highlight';
  };
  attributes: {
    description: Schema.Attribute.Text;
    stat_label: Schema.Attribute.String;
    stat_value: Schema.Attribute.String;
  };
}

export interface OnboardingAdditionalContent extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_additional_content';
  info: {
    description: 'Additional content for walkthrough sections. Only fill the component that matches the Content Type selected.';
    displayName: 'Additional Content';
  };
  attributes: {
    contentType: Schema.Attribute.Enumeration<
      ['WHY_LAUREN', 'TEAM_MEMBERS', 'EMERGENCY_NOTIFICATIONS_FORM', 'NONE']
    > &
      Schema.Attribute.DefaultTo<'NONE'>;
    emergencyNotificationsForm: Schema.Attribute.Component<
      'onboarding.emergency-notifications-form',
      false
    >;
    teamMembers: Schema.Attribute.Component<'onboarding.team-member', true>;
    whyLauren: Schema.Attribute.Component<'onboarding.why-lauren', false>;
  };
}

export interface OnboardingButtonLabels extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_button_labels';
  info: {
    description: 'Button text labels for walkthrough';
    displayName: 'Button Labels';
  };
  attributes: {
    completing: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Completing...'>;
    continue: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Continue'>;
    learnMore: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    watchVideo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Watch video'>;
  };
}

export interface OnboardingContactMethod extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_contact_method';
  info: {
    description: 'Contact method option';
    displayName: 'Contact Method';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OnboardingEmergencyNotificationsForm
  extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_emergency_notifications_form';
  info: {
    description: 'Form configuration for emergency notifications';
    displayName: 'Emergency Notifications Form';
  };
  attributes: {
    contactMethods: Schema.Attribute.Component<
      'onboarding.contact-method',
      true
    >;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Name a contact person to be notified if there are health issues detected during monitoring of your patient.'>;
    formFields: Schema.Attribute.Component<'onboarding.form-field', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Patient Emergency Notifications'>;
  };
}

export interface OnboardingFormField extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_form_field';
  info: {
    description: 'Form field configuration';
    displayName: 'Form Field';
  };
  attributes: {
    fieldKey: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['text', 'email', 'phone', 'select']> &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface OnboardingTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_team_member';
  info: {
    description: 'Team member information';
    displayName: 'Team Member';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OnboardingWhyLauren extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_why_lauren';
  info: {
    description: 'Why Lauren section with multiple subsections';
    displayName: 'Why Lauren Content';
  };
  attributes: {
    contentTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why Lauren?'>;
    sections: Schema.Attribute.Component<
      'onboarding.why-lauren-subsection',
      true
    >;
  };
}

export interface OnboardingWhyLaurenSubsection extends Struct.ComponentSchema {
  collectionName: 'components_onboarding_why_lauren_subsection';
  info: {
    description: 'Individual subsection in Why Lauren';
    displayName: 'Why Lauren Subsection';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.answer-option': ContentAnswerOption;
      'content.author-block': ContentAuthorBlock;
      'content.cta-block': ContentCtaBlock;
      'content.embed-block': ContentEmbedBlock;
      'content.image-block': ContentImageBlock;
      'content.progress-bar': ContentProgressBar;
      'content.question-block': ContentQuestionBlock;
      'content.rich-text-block': ContentRichTextBlock;
      'content.section-block': ContentSectionBlock;
      'content.stat-highlight': ContentStatHighlight;
      'onboarding.additional-content': OnboardingAdditionalContent;
      'onboarding.button-labels': OnboardingButtonLabels;
      'onboarding.contact-method': OnboardingContactMethod;
      'onboarding.emergency-notifications-form': OnboardingEmergencyNotificationsForm;
      'onboarding.form-field': OnboardingFormField;
      'onboarding.team-member': OnboardingTeamMember;
      'onboarding.why-lauren': OnboardingWhyLauren;
      'onboarding.why-lauren-subsection': OnboardingWhyLaurenSubsection;
    }
  }
}
