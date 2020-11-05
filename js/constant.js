const API_INVOKE_URL = 'https://h418ebeyjk.execute-api.us-west-2.amazonaws.com/prod';
const GET_HEADERS = function () {
    return {
        'Content-Type': 'application/json',
        'X-Amz-Access-Token': $('#amz-access-token-input').val()
    }
}

export { API_INVOKE_URL, GET_HEADERS };