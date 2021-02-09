class Count {
    constructor(index) {
        let tag = document.createElement("div");
        let button1 = document.createElement("button");
        let button2 = document.createElement("button");
        let text = document.createElement("input");
    
        tag.appendChild(button1);
        tag.appendChild(text);
        tag.appendChild(button2);
        numbers.appendChild(tag);
    
        // give the tags an class!
        let textString = '<button type="button" onclick="increaseByOne(' + index + ')"></button>';
        button1.outerHTML = textString;

        textString = '<input id="findObject' + index + '" value="0">';
        text.outerHTML = textString;

        textString = '<button type="button" onclick="decreaseByOne(' + index + ')"></button>';
        button2.outerHTML = textString;
    }
}