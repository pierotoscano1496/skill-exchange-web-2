import { jwtDecode } from "jwt-decode";

describe("Token expiration", () => {
  function isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  it("should return true if token is expired", () => {
    const expiredExp = Math.floor(Date.now() / 1000) - 3600;
    const expiredToken = createFakeJwt({ exp: expiredExp });
    expect(isTokenExpired(expiredToken)).toBe(true);
  });

  it("should return false if token is valid", () => {
    const validExp = Math.floor(Date.now() / 1000) + 3600;
    const validToken = createFakeJwt({ exp: validExp });
    expect(isTokenExpired(validToken)).toBe(false);
  });

  it("should return true if token is invalid", () => {
    expect(isTokenExpired("invalid.token.string")).toBe(true);
  });

  it("should check expiration for a real JWT token", () => {
    const realToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb3NlQG1haWwuY29tIiwiZXhwIjoxNzU0MzY1MTA4LCJub21icmUiOiJKb3NlIn0.yjz26H8H2nCLmSQofT76o7vfBKYxzjS7_zPgS9f6ZwU78gYBWnLNDS1z8svtG4k9eqcq8Eea6s8U4NoojSl8Ug";
    console.log(
      "Real token expiration time:",
      new Date(jwtDecode<{ exp: number }>(realToken).exp * 1000).toISOString()
    );
    expect(isTokenExpired(realToken)).toBe(true);
  });
});

// Utilidad para crear un JWT fake (solo para tests, no firmado)
function createFakeJwt(payload: object): string {
  const base64 = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");
  const header = base64({ alg: "HS256", typ: "JWT" });
  const body = base64(payload);
  return `${header}.${body}.signature`;
}
