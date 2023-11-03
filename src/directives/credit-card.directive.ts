import { HostBinding } from "../decorators/HostBinding";
import { HostListener } from "../decorators/HostListener";
import { Directive } from "../decorators/directive";
import { CreditCardVerifier } from "../services/CreditCardVerifier";
import { Formatter } from "./../services/Formatter";

@Directive({
    selector: "[credit-card]",
})
export class CreditCardDirective {
    @HostBinding("style.borderColor")
    borderColor = "blue";

    constructor(public element: HTMLElement, private formatter: Formatter, private verifier: CreditCardVerifier) {}

    @HostListener('input', ["event.target"])
    formatCreditCardNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4, true);
    }
}
