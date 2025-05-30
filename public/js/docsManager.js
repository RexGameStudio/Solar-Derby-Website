var docsLocation = ""
async function webpageContent(src){
    const response = await fetch(docsLocation + src).then(r => r.text()).then(content => {return content;});
    return response
}
void function (script) {

    

    var fetchLocation = script.getAttribute("fetch")
    var name = script.getAttribute("name")

    docsLocation = script.getAttribute("docs")

    console.log("Loading [" + name + "] Documentation : \"" + fetchLocation + "\"")
    fetch(fetchLocation).then(r => r.text()).then(async content => {
        var lines = content.split('\n');
        var newContent = "";
        var webContent = "<div class=\" rounded bg-gradient-to-br from-blue-950 to-gray-700 p-10 border-solid border border-gray-200\"> <div class=\"w-full items-center flex justify-center flex-col\"> <p class=\"text-4xl text-white\">" + name + "</p></div></div>"
        
        var currentSection = "";
        var submenu = false;
        var lastmenu = false;
        for(var i = 0;i < lines.length;i++){
            var title = lines[i].split("\"")[1]
            var src = lines[i].split("src=\"")[1].split("\"")[0]
            
            if (src == "heading")
            {
                if (i != 0){
                    newContent +="<br>"
                }
                currentSection = title + "-";

                newContent += "<p class=\"border-y-[2px] font-normal text-2xl\" style=\"margin-bottom:15px;\">" + title + "</p>"
     
                webContent += "<div id=\"" + title + "\" class=\"w-full\">"
                webContent += "<h3 class=\"flex items-center mt-12 mb-6\">"
                webContent += "<span aria-hidden=\"true\" class=\"w-4 bg-gray-200 rounded h-0.5\"></span>"
                webContent += "<span class=\"mx-3 text-4xl font-medium\">" + title + "</span>"
                webContent += "<span aria-hidden=\"true\" class=\"flex-grow bg-gray-200 rounded h-0.5\"></span>"
                webContent += "</h3>"
                webContent += "</div>"
            }
            else
            {
                if (lines[i][0] != "-"){
                    if (submenu){
                        submenu = false
                        newContent += " </ul>"
                    }
                    if (lastmenu){
                        lastmenu = false
                        webContent += "</section>"
                    }
                    lastmenu = true;
                    webContent += "<section id=\"" + currentSection + src + "\"><div class=\"h-full mt-5\">"
                    webContent += "<p class=\"font-normal text-2xl\">" + title + "</p>"
                    webContent += await webpageContent(src)
                    webContent += "</div>"
                    newContent = newContent + "<li class=\"font-medium\"><a href=\"#" + currentSection + src + "\">" + title + "</a></li>"
                }else{
                    if (!submenu){
                        submenu = true
                        newContent += "<ul class=\"nav\">"
                    }
                    webContent += "<section id=\"" + currentSection + src + "\" class=\"border-l-[2px]\"><div class=\"h-full mt-3 ml-5\">"
                    webContent += "<p class=\"font-normal text-xl\">" + title + "</p>"
                    webContent += await webpageContent(src)
                    webContent += "</div></section>"
                    newContent += "<li class=\"text-[#111] dark:text-slate-300 pl-[20px] font-[400] border-l-[2px]\"> <a href=\"#" + currentSection + src + "\">" + title + "</a></li>"
                }
                //code here using lines[i] which will give you each line
            }
        }
        if (submenu){
            submenu = false
            newContent += " </ul>"
        }
        document.getElementById("page-table-of-contents").innerHTML = newContent;
        document.getElementById("page-content").innerHTML = webContent
    });
}(document.currentScript);