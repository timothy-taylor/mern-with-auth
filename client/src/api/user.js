export const userAPI = {
  new: (credentials) => ({ method: "POST", url: "/v1/user/", data: credentials }),
}
