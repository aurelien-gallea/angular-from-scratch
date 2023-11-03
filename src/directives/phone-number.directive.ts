import { HostBinding } from "../decorators/HostBinding";
import { HostListener } from "../decorators/HostListener";
import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";
import { Detector } from "../framework/ChangeDetector";
import { Formatter } from "./../services/Formatter";

@Directive({
    selector: "[phone-number]",
    providers: [
        {
            provide: "formatter",
            construct: () => new Formatter("spécifique"),
        },
    ],
})
export class PhoneNumberDirective {
    

    @Input("with-spaces")
    willHaveSpaces = true;

    @HostBinding("value")
    value = "";

    @Input("border-color")
    @HostBinding("style.borderColor")
    borderColor = "red";

    @HostBinding("placeholder")
    placeholderText = "Hello World";

    @HostListener("click")
    onClick() {
        this.placeholderText = "lire";
        this.placeholderText = "2";
        this.borderColor = "blue";
        this.borderColor = "red";
        this.placeholderText = "3";

        Detector.digest();
    }
    constructor(public element: HTMLElement, private formatter: Formatter) {}

    @HostListener("input", ["event.target.value"])
    formatPhoneNumber(value: string) {
        this.value = this.formatter.formatNumber(value, 10, 2, this.willHaveSpaces);
        Detector.digest();
    }

}
