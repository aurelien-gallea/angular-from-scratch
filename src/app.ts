import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";

const directives = [PhoneNumberDirective, CreditCardDirective];
for (const directive of directives) {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);
    for (const element of elements) {
        const directiveInstance = new directive(element);
        directiveInstance.init();
    }
}
