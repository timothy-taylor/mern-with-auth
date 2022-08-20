const { userServices } = require("../user-services");

//
// unit tests for the userServices

const mockDb = {
  collection: (_) => ({
    insertOne: (obj) => ({ 
      username: obj.username,
      password: obj.password,
    }),
  }),
};

test("register", async () => {
  const result = await userServices.register(mockDb, "pizza", "party");
  expect(result).toHaveProperty("username", "pizza");
  expect(result).not.toHaveProperty("password", "party");
});
