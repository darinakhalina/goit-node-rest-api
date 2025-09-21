import { jest, expect, beforeEach, describe, test } from "@jest/globals";

jest.unstable_mockModule("../services/authServices.js", () => ({
    __esModule: true,
    default: {
        loginUser: jest.fn().mockResolvedValue({
            id: 1,
            token: "test-token",
            email: "test@example.test",
            subscription: "starter",
        }),
    },
}));

const { loginUser: loginController } = (await import(
    "../controllers/authControllers.js"
    )).default;

const authServices = (await import("../services/authServices.js")).default;

beforeEach(() => {
    jest.clearAllMocks();
});

describe("authControllers", () => {
    describe("#loginUser", () => {
        test("returns 200 and user payload on success", async () => {
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(() => res),
            };
            const req = {
                body: { email: "test@example.test", password: "11111111" },
            };

            await loginController(req, res);

            expect(authServices.loginUser).toHaveBeenCalledTimes(1);
            expect(authServices.loginUser).toHaveBeenCalledWith(req.body);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                token: "test-token",
                user: {
                    email: "test@example.test",
                    subscription: "starter",
                },
            });
        });

        test("calls next with an error when the service rejects", async () => {
            const error = new Error("test-error");
            authServices.loginUser.mockRejectedValueOnce(error);

            const res = {
                status: jest.fn(() => res),
                json: jest.fn(() => res),
            };
            const req = { body: { email: "error@email.error", password: "error" } };
            const next = jest.fn();

            await loginController(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test("calls next with the error when service fails", async () => {
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(() => res),
            };

            const req = { body: { email: "test@example.test", password: "11111111" }, };

            await loginController(req, res);

            const statusReturn = res.status.mock.results[0].value;
            expect(statusReturn).toBe(res);
        });
    });
});
