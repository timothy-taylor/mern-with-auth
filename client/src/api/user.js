export const userAPI = {
  new: (credentials) => ({ method: "POST", url: "/v1/users/", data: credentials }),
}
