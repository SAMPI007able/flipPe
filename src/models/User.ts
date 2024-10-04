export class User {
    fullName: string;
    email: string;
    private id: string;
    constructor(fullName: string, email: string, id: string) {
        this.fullName = fullName;
        this.email = email;
        this.id = id;
    }
    getId(): string {
        return this.id;
    }
}