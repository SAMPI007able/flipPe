import { User } from "./models/User";
import { Account } from "./models/Account";
import { Payment } from "./models/Payment";
interface iTransaction {
    id: string;
    userFullName: string;
    amount: number;
    type: PaymentType;
}

enum PaymentType {
    Debit,
    Credit
}


export class PaymentApp {
    private users: Map<string, User> = new Map();
    public accounts: Map<string, Account> = new Map();
    private transactions: Payment[] = [];
    constructor() {}
    addUser(fullName: string, email: string): string {
        const id = this.generateUid();
        if(this.users.has(email)) {
            throw new Error("User already exists");
        }
        const addedUser = new User(fullName, email, id);
        this.users.set(id, addedUser);
        const addedAccount = this.addAccount(this.generateUid(), addedUser, 0);
        this.accounts.set(id, addedAccount)
        return id
    }
    private addAccount(id: string, owner: User, balance: number): Account {
        if(this.accounts.has(id)) {
            throw new Error("Account already exists");
        }
        return new Account(id, owner, balance)
    }

    public makePayment(sender: Account, receiver: Account, amount: number): void {
        const payment = new Payment(this.generateUid(), sender, receiver, amount);
        payment.execute();
        this.transactions.push(payment);
    }

    getTransactions(userId: string) : iTransaction[] {
        const userTransactions: Payment[]  = this.transactions.filter((payment: Payment) => payment.sender.getId() === userId || payment.receiver.getId() === userId)
        return userTransactions.map((payment: Payment) => {
            return {
                id: payment.getId(),
                userFullName: payment.sender.getId() === userId ? payment.sender.owner.fullName : payment.receiver.owner.fullName,
                amount: payment.amount,
                type: payment.sender.getId() === userId ? PaymentType.Debit : PaymentType.Credit
            }
        })
    }

    private generateUid(): string {
        return Math.random().toString(36).substring(2,9)
    }

}