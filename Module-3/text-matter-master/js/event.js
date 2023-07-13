class Event {
    constructor() {
        this.eventHandlers = new Array();
    }
    addHandler(name,callback) {
        this.eventHandlers.push({
            name:name,
            callback:callback
        });
    }
    execute(name,payload) {
        for (var i = 0; i < this.eventHandlers.length; i++) {
            if(name == this.eventHandlers[i].name){
                this.eventHandlers[i].callback(payload);
            }
        }
    }
}


