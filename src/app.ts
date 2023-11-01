import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Formatter } from "./services/Formatter";

// framework
const directives = [PhoneNumberDirective, CreditCardDirective];

const formatter = new Formatter();

for (const directive of directives) {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);
    for (const element of elements) {
        const directiveInstance = new directive(element, formatter);
        directiveInstance.init();
    }
}
