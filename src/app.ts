import { Angular } from "./framework/framework";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardVerifier } from "./services/CreditCardVerifier";
import { Formatter } from "./services/Formatter";
import { ProvidersMetadata } from "./framework/types";
import { NgZone } from "./framework/zone";

NgZone.run(() => {

    Angular.bootstrapApplication({
        declarations : [PhoneNumberDirective, CreditCardDirective],
        providers:[
            {
                provide: "formatter",
                construct: () => new Formatter("global"),
            },
            {
                provide: "verifier",
                construct: () => new CreditCardVerifier(),
            },
        ],
    });
})

