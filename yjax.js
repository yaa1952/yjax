
function yjax_send(url, obj, get_answer) {
    var yjax_xhr = new XMLHttpRequest();
    try {
        yjax_xhr.open("POST", url, true);
        yjax_xhr.setRequestHeader(
                "Content-Type",
                "Content-Type", "application/json;charset=UTF-8"
                );
        yjax_xhr.onreadystatechange = yjax_getData;
        yjax_xhr.send(JSON.stringify(obj));
    } catch (e) {
        alert("Server not found");
        console.log(e);
    }
    function yjax_getData() {
        if (get_answer === null)
            return;
        if (typeof (get_answer) !== "function") {
            alert("The function to get the response is not defined");
            return;
        }
        if (yjax_xhr.readyState === 4 && yjax_xhr.status === 200) {
            resp = yjax_xhr.responseText;
            i = resp.indexOf('<#');
            j = resp.indexOf('#>');
            var answer = {};
            if (i < 0 || j < 0)
                answer['debug'] = resp;
            else {
                json_str = resp.slice(i + 2, j);
                answer = JSON.parse(json_str);
                debug = '';
                if (i > 0)
                    debug += resp.slice(0, i);
                if (j + 2 < resp.length)
                    debug += resp.slice(j + 2);
                answer['debug'] = debug;
            }
            get_answer(answer);
        }
    }
}
