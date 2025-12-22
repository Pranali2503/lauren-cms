export default {
  register() {},

  async bootstrap({ strapi }) {
    const paragraph = (text: string) => [
      {
        type: 'paragraph',
        children: [{ text }],
      },
    ];

    const ensureTopic = async () => {
      const existing = await strapi.entityService.findMany(
        'api::learning-topic.learning-topic',
        { filters: { slug: 'pre-pregnancy-early-pregnancy' }, limit: 1 }
      );
      if (existing?.length) return existing[0].id;

      const created = await strapi.entityService.create(
        'api::learning-topic.learning-topic',
        {
          data: {
            Title: 'Pre-Pregnancy & Early Pregnancy',
            slug: 'pre-pregnancy-early-pregnancy',
            Summary:
              'Learning path for blood pressure education during early pregnancy.',
            trackStatus: 'current',
            publishedAt: new Date(),
          },
        }
      );
      return created.id;
    };

    const ensureModules = async (topicId: number) => {
      const modules = [
        {
          Title: 'Module 1: Understanding High Blood Pressure',
          slug: 'module-1-understanding-high-blood-pressure',
          Weeks: 'Weeks 1–2',
          lock_status: 'open',
          order: 1,
        },
        {
          Title: 'Module 2: Home Blood Pressure Monitoring',
          slug: 'module-2-home-blood-pressure-monitoring',
          Weeks: 'Weeks 3–4',
          lock_status: 'locked',
          order: 2,
        },
        {
          Title: 'Module 3: Heart-Healthy Nutrition',
          slug: 'module-3-heart-healthy-nutrition',
          Weeks: 'Weeks 5–6',
          lock_status: 'locked',
          order: 3,
        },
        {
          Title: 'Module 4: Stress & Blood Pressure Connection',
          slug: 'module-4-stress-and-blood-pressure-connection',
          Weeks: 'Weeks 7–8',
          lock_status: 'locked',
          order: 4,
        },
      ];

      const created: Record<string, number> = {};

      for (const mod of modules) {
        const existing = await strapi.entityService.findMany(
          'api::learning-module.learning-module',
          { filters: { slug: mod.slug }, limit: 1 }
        );
        if (existing?.length) {
          const current = existing[0];
          // If topic is not set, set it now for idempotency
          if (!current.topic) {
            await strapi.entityService.update(
              'api::learning-module.learning-module',
              current.id,
              {
                data: { topic: topicId, publishedAt: current.publishedAt ?? new Date() },
              }
            );
          }
          created[mod.slug] = current.id;
          continue;
        }

        const res = await strapi.entityService.create(
          'api::learning-module.learning-module',
          {
            data: {
              ...mod,
              topic: topicId,
              publishedAt: new Date(),
            },
          }
        );
        created[mod.slug] = res.id;
      }

      return created;
    };

    const ensureSubtopicsForModule1 = async (moduleId: number) => {
      const subtopics = [
        {
          Title: 'Blood pressure basics and pregnancy impact',
          order: 1,
          Summary:
            'Learn what blood pressure is and how it changes during pregnancy.',
          Content_steps: [
            {
              __component: 'content.rich-text-block',
              Body: paragraph(
                'What is Blood Pressure? Learn how it changes during pregnancy.'
              ),
            },
            {
              __component: 'content.stat-highlight',
              stat_label: '1 in 12',
              stat_value: 'pregnant people develop high blood pressure during pregnancy',
              description:
                'Daily monitoring can catch dangerous changes before they become life-threatening for both mom and baby.',
            },
            {
              __component: 'content.rich-text-block',
              Body: paragraph(
                'Daily monitoring can catch changes before they become life-threatening for both mom and baby.'
              ),
            },
            {
              __component: 'content.question-block',
              question: 'How does blood pressure impact a fetus?',
              answer: '',
              answerOoption:
                'Esse cillum dolore in voluptate velit; Sint occa ecat cupidatat; Fugiat nulla pariatur esse cillum',
              is_correct: false,
              explanation:
                'Consistent monitoring helps detect issues early for mom and baby.',
            },
            {
              __component: 'content.embed-block',
              type: 'animation',
              url: 'https://example.com/animation.mp4',
            },
            {
              __component: 'content.cta-block',
              label: 'Finish',
              action_type: 'finish',
              target_url: '/lessons/finish',
            },
          ],
        },
        {
          Title: 'Preeclampsia awareness and symptoms',
          order: 2,
          Summary: 'Recognize signs of preeclampsia early.',
          Content_steps: [],
        },
        {
          Title: 'Target ranges for pregnancy (<120/80)',
          order: 3,
          Summary: 'Know your target blood pressure ranges in pregnancy.',
          Content_steps: [],
        },
        {
          Title: 'Interactive preeclampsia symptom tracker',
          order: 4,
          Summary: 'Track and report symptoms interactively.',
          Content_steps: [],
        },
      ];

      for (const sub of subtopics) {
        // Check if subtopic exists by title (regardless of module link)
        const existing = await strapi.entityService.findMany(
          'api::subtopic.subtopic',
          { filters: { Title: sub.Title }, limit: 1 }
        );
        
        if (existing?.length) {
          const current = existing[0];
          // If module is not set or different, update it
          if (!current.module || current.module.id !== moduleId) {
            await strapi.entityService.update(
              'api::subtopic.subtopic',
              current.id,
              {
                data: {
                  module: moduleId,
                  order: sub.order,
                  Summary: sub.Summary,
                  Content_steps: sub.Content_steps,
                  publishedAt: current.publishedAt ?? new Date(),
                },
              }
            );
          }
          continue;
        }

        // Create new subtopic
        await strapi.entityService.create('api::subtopic.subtopic', {
          data: {
            ...sub,
            module: moduleId,
            publishedAt: new Date(),
          },
        });
      }
    };

    try {
      const topicId = await ensureTopic();
      strapi.log.info(`[Bootstrap] Topic ID: ${topicId}`);
      
      const modules = await ensureModules(topicId);
      strapi.log.info(`[Bootstrap] Modules created:`, modules);

      const module1Id =
        modules['module-1-understanding-high-blood-pressure'] || null;

      if (module1Id) {
        strapi.log.info(`[Bootstrap] Creating subtopics for Module 1 (ID: ${module1Id})`);
        await ensureSubtopicsForModule1(module1Id);
        strapi.log.info(`[Bootstrap] Subtopics created successfully`);
      } else {
        strapi.log.warn(`[Bootstrap] Module 1 ID not found, skipping subtopic creation`);
      }
    } catch (err) {
      strapi.log.error('Bootstrap seeding failed', err);
    }
  },
};
