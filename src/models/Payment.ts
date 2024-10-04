import { Transaction } from "./Transaction";
import { Account } from "./Account";
export class Payment extends Transaction {
    sender: Account;
    receiver: Account;
    constructor(id: string, sender: Account, receiver: Account, amount: number) {
        super(id, amount);
        this.sender = sender;
        this.receiver = receiver;
    }
    execute(): void {
        if( this.sender.getId() === this.receiver.getId() ) {
            throw new Error("Sender and receiver cannot be same");
        }
        try {
            if(this.sender.deductAmount(this.amount) !== null) {
                this.receiver.addAmount(this.amount)
            }
        } catch (error) {
            throw new Error("Payment Failed" + error);
        }
    }
}