export class Formatter {
    static id = 0;

    constructor() {
        const id = Formatter.id++ ;
        console.log("Je suis le formatteur n°" + id);
        
    }
    formatNumber(initialValue: string, length: number, groupLenght: number, willHaveSpaces = true) {
        const value = initialValue.replace(/[^\d+]/g, "").substring(0, length);

        const groups: string[] = [];

        for (let i = 0; i < value.length; i += groupLenght) {
            groups.push(value.substring(i, i + groupLenght));
        }

        return groups.join(willHaveSpaces ? " " : "");
    }
}
