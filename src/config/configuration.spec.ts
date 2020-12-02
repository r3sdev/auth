import { validSchema } from './'

describe('Configuration', () => {
    it('should have the required ENV variables', async () => {
        try {
            await validSchema.validateAsync({
                NODE_ENV: process.env.NODE_ENV,
                SCHEME: process.env.SCHEME,
                HOST: process.env.HOST,
                PORT: process.env.PORT,
                POSTGRES_HOST: process.env.POSTGRES_HOST,
                POSTGRES_PORT: process.env.POSTGRES_PORT,
                POSTGRES_USER: process.env.POSTGRES_USER,
                POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
                POSTGRES_DB: process.env.POSTGRES_DB,
                JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
                JWT_ACCESS_TOKEN_EXPIRATION_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
                JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
                JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
            }, { abortEarly: false });
        }
        catch (err) {
            expect(err).toBeUndefined()
        }
    })
})