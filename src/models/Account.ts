import { User } from './User'
export class Account {
    private id: string;
    owner: User;
    balance: number;
    constructor(id: string, owner: User, balance: number=0) {
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }
    getId(): string {
        return this.id;
    }
    addAmount(amount: number): number {
        if(typeof amount !== "number") {
            throw new Error("Amount must be a number");
        } else if(amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        this.balance += amount;
        return this.balance;
    }
    deductAmount(amount: number): number {
        if(amount <= 0) {
            throw new Error("Amount must be greater than 0");
        } else if (amount > this.balance) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
        return this.balance;
    }
}