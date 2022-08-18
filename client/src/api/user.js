export const userAPI = {
  index: (token) => ({
    method: "GET",
    url: "/v1/user/",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  new: (credentials) => ({ method: "POST", url: "/v1/user/", data: credentials }),
}
