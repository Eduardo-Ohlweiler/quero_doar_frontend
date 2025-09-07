export default class LoginDTO {
    constructor(email, password) {
        this.email = email ?? null;
        this.password_hash = password ?? null;
    }
}