/**
 * Lifecycle hooks for onboarding-walkthrough-section
 * Validates additional content component based on contentType
 * Cleans up unused component data to prevent validation errors
 */

/**
 * Cleans up additional content by removing unused component data
 * This prevents validation errors when contentType doesn't match the component
 */
function cleanAdditionalContent(data: any) {
  if (!data.additionalContent) {
    return; // No additional content to clean
  }

  const { contentType } = data.additionalContent;

  // If contentType is WHY_LAUREN, remove teamMembers and emergencyNotificationsForm
  if (contentType === 'WHY_LAUREN') {
    data.additionalContent.teamMembers = null;
    data.additionalContent.emergencyNotificationsForm = null;
    return;
  }

  // If contentType is TEAM_MEMBERS, remove whyLauren and emergencyNotificationsForm
  if (contentType === 'TEAM_MEMBERS') {
    data.additionalContent.whyLauren = null;
    data.additionalContent.emergencyNotificationsForm = null;
    // Also clean up any empty team member entries
    if (data.additionalContent.teamMembers && Array.isArray(data.additionalContent.teamMembers)) {
      data.additionalContent.teamMembers = data.additionalContent.teamMembers.filter(
        (member: any) => member && member.name && member.title && member.description
      );
    }
    return;
  }

  // If contentType is EMERGENCY_NOTIFICATIONS_FORM, remove whyLauren and teamMembers
  if (contentType === 'EMERGENCY_NOTIFICATIONS_FORM') {
    data.additionalContent.whyLauren = null;
    data.additionalContent.teamMembers = null;
    return;
  }

  // If contentType is NONE, remove all component data
  if (contentType === 'NONE' || !contentType) {
    data.additionalContent.whyLauren = null;
    data.additionalContent.teamMembers = null;
    data.additionalContent.emergencyNotificationsForm = null;
    return;
  }
}

/**
 * Validates that the appropriate component is filled based on contentType
 * Only validates that required components are present, allows others to be empty
 */
function validateAdditionalContent(data: any) {
  if (!data.additionalContent) {
    return; // No additional content, validation passes
  }

  const { contentType, whyLauren, teamMembers, emergencyNotificationsForm } = data.additionalContent;

  // If contentType is NONE, no validation needed - all fields can be empty
  if (contentType === 'NONE' || !contentType) {
    return; // Allow all fields to be empty/null
  }

  // If contentType is WHY_LAUREN, whyLauren should be filled
  if (contentType === 'WHY_LAUREN') {
    if (!whyLauren) {
      throw new Error('Why Lauren component is required when Content Type is WHY_LAUREN.');
    }
    // Don't validate that other fields are empty - they can be null/undefined
    return;
  }

  // If contentType is TEAM_MEMBERS, teamMembers should be filled
  if (contentType === 'TEAM_MEMBERS') {
    if (!teamMembers || teamMembers.length === 0) {
      throw new Error('At least one Team Member is required when Content Type is TEAM_MEMBERS.');
    }
    // Don't validate that other fields are empty - they can be null/undefined
    return;
  }

  // If contentType is EMERGENCY_NOTIFICATIONS_FORM, emergencyNotificationsForm should be filled
  if (contentType === 'EMERGENCY_NOTIFICATIONS_FORM') {
    if (!emergencyNotificationsForm) {
      throw new Error('Emergency Notifications Form component is required when Content Type is EMERGENCY_NOTIFICATIONS_FORM.');
    }
    // Don't validate that other fields are empty - they can be null/undefined
    return;
  }
}

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    cleanAdditionalContent(data);
    validateAdditionalContent(data);
  },

  async beforeUpdate(event: any) {
    const { data } = event.params;
    cleanAdditionalContent(data);
    validateAdditionalContent(data);
  },
};
