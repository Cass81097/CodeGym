
let keyList = [];

document.addEventListener("keyup", event => {
    let EventKey = event.key;
    if(EventKey == "Shift"){
        return;
    }
    if(!keyList.some(key=> key == EventKey)){
        keyList.push("'" + EventKey + "'");
        console.log(EventKey);
    }
});

function showKeys(){
    console.log(keyList);
    return true;
}
function clearList() {
    keyList = [];
    return true;
}