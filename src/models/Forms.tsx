export default function submitForm(data: object) {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8085/registration";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            return(this.responseText);
        }
        return false;
    };
    let dataJson = JSON.stringify(data);
    xhr.send(dataJson);
};