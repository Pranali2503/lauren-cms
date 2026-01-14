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
    }
  }
}
