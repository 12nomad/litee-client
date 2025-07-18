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
    delete: "/transactions",
    update: "/transactions",
    bulkDelete: "/transactions/bulk-delete",
    bulkCreate: "/transactions/bulk-create",
  },
  categories: {
    getAll: "/categories",
    create: "/categories",
    delete: "/categories",
    update: "/categories",
    bulkDelete: "/categories/bulk-delete",
  },
  reports: {
    getAll: "/reports",
  },
};
