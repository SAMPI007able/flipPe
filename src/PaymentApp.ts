import { User } from "./models/User";
import { Account } from "./models/Account";
import { Payment } from "./models/Payment";
import { PercentageCashbackStrategy } from "./strategies/PercentageCashbackStrategy";

enum PaymentType {
    Debit = "De",
    Credit = "Cr"
}

interface iTransactionListing {    
    id: string,
    userFullName: string,
    amount: number,
    type: PaymentType,
    bal: number    
}

interface iTransaction {
    currSenderBalance: number;
    currReceiverBalance: number;
    payment: Payment
}

export class PaymentApp {
    private users: Map<string, User> = new Map();
    public accounts: Map<string, Account> = new Map();
    private transactions: iTransaction[] = [];
    private cashbackStrategy: PercentageCashbackStrategy = new PercentageCashbackStrategy(10);
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
        const fundToBeReturned = this.cashbackStrategy.execute(payment.amount);
        if(fundToBeReturned > 0) {
            sender.addAmount(fundToBeReturned);
        }
        this.transactions.push({ currSenderBalance: sender.balance, currReceiverBalance: receiver.balance, payment: payment });
    }

    getTransactions(userId: string) : iTransactionListing[] {
        const userTransactions: iTransaction[]  = this.transactions.filter(({payment}) => payment.sender.getId() === userId || payment.receiver.getId() === userId)
        return userTransactions.map(({currSenderBalance, currReceiverBalance, payment}) => {
            return {
                id: payment.getId(),
                userFullName: payment.sender.getId() === userId ? payment.sender.owner.fullName : payment.receiver.owner.fullName,
                amount: payment.amount,
                type: payment.sender.getId() === userId ? PaymentType.Debit : PaymentType.Credit,
                bal: payment.sender.getId() === userId ? currSenderBalance : currReceiverBalance
            }
        })
    }

    private generateUid(): string {
        return Math.random().toString(36).substring(2,9)
    }

}