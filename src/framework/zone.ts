import '../../node_modules/zone.js/';

export const NgZone = Zone.current.fork({
    onInvokeTask(parent, current, target, task, applyThis, applyArgs) {
        console.log("Le navigateur essaie d'appeler une fonction.");
    },
    name: "NgZone"
});
