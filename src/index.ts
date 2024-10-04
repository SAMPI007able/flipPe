import { PaymentApp } from "./PaymentApp";
import { Account } from "./models/Account";
class ConsoleApp {
    private app: PaymentApp
    constructor() {
        this.app = new PaymentApp();
    }
    run() {
        const userOneId = this.app.addUser("Arnab", "arnab@gmail.com");
        const userTwoId = this.app.addUser("John", "john@gmail.com");
        const userOneAccount: Account | undefined = this.app.accounts.get(userOneId);
        const userTwoAccount: Account | undefined = this.app.accounts.get(userTwoId);
        if(userTwoAccount && userOneAccount) {
            userOneAccount.addAmount(10000);
            this.app.makePayment(userOneAccount, userTwoAccount, 100);
            this.app.makePayment(userOneAccount, userTwoAccount, 200);
            this.app.makePayment(userOneAccount, userTwoAccount, 300);
            this.app.makePayment(userOneAccount, userTwoAccount, 400);
            
            this.app.makePayment(userTwoAccount, userOneAccount, 200);
            console.table(this.app.getTransactions(userTwoAccount.getId()));
        }
    }
}

const app = new ConsoleApp();
app.run();
