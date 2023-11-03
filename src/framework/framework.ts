import { CreditCardDirective } from "../directives/credit-card.directive";
import { PhoneNumberDirective } from "../directives/phone-number.directive";
import { Detector } from "./ChangeDetector";
import { Module, ProvidersMetadata, ServiceInstances } from "./types";
import  set  from "lodash/set";
export class Framework {
    /**
     * Le tableau qui recense l'ensemble des directives déclarés
     * par mes collègues dans le projet
     */
    directives: any[] = [];
    /**
     * Le tableau qui continet les instances de services déjà construites
     * (pour ne pas les reconstruire)
     */
    services: ServiceInstances = [];
    /**
     * Le tableau qui contient les définitions de mes services
     * (comment construire tel ou tel service)
     */
    providers: ProvidersMetadata = [];

    /**
     * Le traitement qui va instancier les directives et les greffer aux
     * éléments HTML ciblés par les sélecteurs CSS
     */
    bootstrapApplication(metadata: Module) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach((directive) => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);
            elements.forEach((element) => {
                const params = this.analyseDirectiveConstructor(directive, element);
                const directiveInstance: any = Reflect.construct(directive, params);

                const proxy = new Proxy(directiveInstance, {
                    set(target, propName: string, value, proxy) {

                        target[propName] = value;
                        if (!target.bindings) {
                            return true;
                        }
                        const binding = target.bindings.find((b) => b.propName === propName);
                        if (!binding) {
                            return true;
                        }
                        
                        
                        Detector.addBinding(element, binding.attrName, value)
                        set(target.element, binding.attrName, value)
                        

                        return true;
                    },
                });
                proxy.init();
            });
        });
    }

    /**
     * Permet d'analyser les besoins d'un constructeur et de créer les instances nécessaires.
     * @param directive La classe de la directive à instancier
     * @param element L'élément HTML sur lequel on veut greffer la directive
     * @returns Le tableau de paramètres nécessaire pour instancier ma directive
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

        if (!hasConstructor) {
            return [];
        }

        const paramsNames = this.extractParamNamesFromDirective(directive);
        const params = paramsNames.map((name) => {
            if (name === "element") {
                return element;
            }

            const directiveProviders = directive.providers || [];
            const directiveProvider = directiveProviders.find((p) => p.provide === name);

            if (directiveProvider) {
                const instance = directiveProvider.construct();
                return instance;
            }

            const service = this.services.find((s) => s.name === name);
            if (service) {
                return service.instance;
            }
            const provider = this.providers.find((p) => p.provide === name);
            if (!provider) {
                throw new Error("Aucun fournisseur n'existe pour le service " + name);
            }

            const instance = provider.construct();
            this.services.push({
                name: name,
                instance: instance,
            });
        });
        return params;
    }

    /**
     * Extrait les noms des paramètres du constructeur d'une directive
     * @param directive La directive dont je veux connaître les paramètres
     * @returns Un tabelau avec les noms des paramètres du constructeur
     */
    private extractParamNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString());

        if (!params) {
            return [];
        }

        return params[1].split(", ");
    }
}

export const Angular = new Framework();
