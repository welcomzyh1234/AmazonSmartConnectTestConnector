export function enablePopover() {
    $('[data-toggle="popover"]').popover();
}

export function invokeApiSuccessCallback(response, status, error) {
    alert('Successfully invoked API with response: ' + JSON.stringify(response))
}

export function invokeApiErrorCallback(response, status, error) {
    console.log('Response: ' + JSON.stringify(response))
    console.log(status)
    console.log(error)
    alert('Error occurred with status: ' + status + ' and error message: ', error)
}