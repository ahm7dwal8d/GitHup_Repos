let inputValue = localStorage.getItem("inputValue")
if (inputValue !== null) {
    document.querySelector("form input").value = inputValue
}
console.log(JSON.parse(localStorage.getItem("elemets")))
document.forms[0].onsubmit = function (e) {
    let inputValue = document.querySelector("form input").value;
    e.preventDefault()  
    if (inputValue !== "") {
        function getData(githupName) {
            let request = new XMLHttpRequest();
            request.open("GET", `https://api.github.com/users/${githupName}/repos`)
            request.send()
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let ul = document.querySelector(".container ul")
                    let jsData = JSON.parse(this.responseText)
                    console.log(jsData)
                    while (ul.firstChild) {
                        ul.removeChild(ul.firstChild)
                    }
                    for (let i = 0; i < jsData.length; i++) {
                        let li = document.createElement("li")
                        let liText = document.createTextNode(jsData[i].name)
                        li.appendChild(liText)
                        ul.appendChild(li)
                        let operation = document.createElement("div")
                        operation.className = "operation"
                        let viewLink = document.createElement("a")
                        viewLink.href = jsData[i].html_url
                        let viewLinkText = document.createTextNode("view")
                        viewLink.appendChild(viewLinkText)
                        operation.appendChild(viewLink)
                        let lan = document.createElement("span")
                        let lanText = document.createTextNode(jsData[i].language)
                        lan.appendChild(lanText)
                        operation.appendChild(lan)
                        let watchers = document.createElement("span")
                        let watchersText = document.createTextNode(jsData[i].watchers)
                        watchers.appendChild(watchersText)
                        operation.appendChild(watchers)
                        li.appendChild(operation)
                    }
                }
            }
        }
        localStorage.setItem("inputValue", inputValue)
        getData(inputValue)
    } else {
        document.querySelector(".container ul").innerHTML = `<li>Not Found</li>`
    }
}
