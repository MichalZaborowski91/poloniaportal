export const routes = {
  home: (c) => `/${c}`,
  login: (c) => `/${c}/login`,
  register: (c) => `/${c}/register`,
  profile: (c) => `/${c}/profile`,
  onboarding: (c) => `/${c}/onboarding`,
  account: (c) => `/${c}/account`,
  security: (c) => `/${c}/account/security`,
  addOffer: (c) => `/${c}/add-offer`,
  terms: () => "/terms",
  privacy: () => "/privacy",
  forgotPassword: (c) => `/${c}/forgot-password`,
  resetPassword: (c, token) => `/${c}/reset-password/${token}`,
};
