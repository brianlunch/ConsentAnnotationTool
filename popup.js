window.onload = function (){

document.getElementById("button").click(function(){
    console.log("f")

    chrome.runtime.sendMessage({ msg: "screenshot" });
});
}