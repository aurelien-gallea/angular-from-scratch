/**
 * Permet de lier une méthode de la directive à un événement qui aura lieu sur l'élément HTML
 * @param eventName L'évenement auquel on souhaite réagir et lier la méthode
 * @param params tableau des paramètres dont on a besoin.
 * exemple:
 * 
 * @HostListener('click', ["event.target"])
 * 
 * onClick(target) {}
 * 
 * @returns 
 */
export function HostListener(eventName: string, params : (string|number)[] = []) {
    return function(decoratedClass, methodName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function(){};

        decoratedClass["init"] = function() {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = params.map(param => eval(param.toString()));   
                this[methodName](...paramsToSend);
            })
        }
    }
}