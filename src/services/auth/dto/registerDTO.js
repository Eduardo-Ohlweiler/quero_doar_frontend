export default class RegisterDTO {
    constructor(name, email, password) {
        this.name = name ?? null;
        this.email = email ?? null;
        this.password_hash = password ?? null;
    }
}