export const authAPI = {
  new: (credentials) => ({ method: "POST", url: "/v1/auth/", data: credentials }),
};
