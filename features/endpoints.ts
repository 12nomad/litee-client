export const endpoints = {
  authentication: {
    signin: "/authentication/sign-in",
    signup: "/authentication/sign-up",
    logout: "/authentication/logout",
    getAuthenticatedUser: "/authentication/authenticated-user",
  },
  accounts: {
    getAll: "/accounts",
    create: "/accounts",
    delete: "/accounts",
    update: "/accounts",
  },
  transactions: {
    getAll: "/transactions",
    create: "/transactions",
    bulkDelete: "/transactions/bulk-delete",
  },
};
