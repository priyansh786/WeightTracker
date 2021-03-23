export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export async function postData(url = '', data = {}, contentType='application/json') {
    const customHeaders = {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type':contentType,
        'Accept':'application/json'
    }
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: customHeaders,
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    });

    return await response.json();
}