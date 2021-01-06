import { PostgresErrorCode } from "../../src/database/postgres-error-code.enum";

export const mockedUser = {
    id: "test",
    email: "test@test.com",
    firstName: "John",
    lastName: "Test",
    password: "hashedpassword"
}

export const mockedUsersService = {
    create: jest.fn()
        .mockResolvedValueOnce(mockedUser)
        .mockRejectedValueOnce({ code: PostgresErrorCode.UniqueViolation })
        .mockRejectedValueOnce({}),
    findOneByEmail: jest.fn()
        .mockResolvedValueOnce(mockedUser)
}