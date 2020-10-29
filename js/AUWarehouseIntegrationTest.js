'use strict'

$(function () {
    $("#inventories-row").load("html/inventories.html", load_inventories_script);
    $("#prices-row").load("html/prices.html", load_prices_script);
    $("#events-row").load("html/events.html", enablePopover);

    window.onAmazonLoginReady = function () {
        console.log('[INFO] Amazon Login Ready');
    };
    const $script = $(
        '<script>',
        {
            type: 'text/javascript',
            async: true,
            src: 'https://assets.loginwithamazon.com/sdk/na/login1.js'
        }
    ).appendTo($('#amazon-root'));

    $('#lwa-login-button').click(function () {
        let options = {
            scope: [
                'smartconnect::inventories',
                'smartconnect::orders',
                'smartconnect::pricing',
                'smartconnect::events'
            ],
            scope_data: {
                'smartconnect::inventories': { 'essential': true },
                'smartconnect::orders': { 'essential': true },
                'smartconnect::pricing': { 'essential': true },
                'smartconnect::events': { 'essential': true }
            },
            response_type: 'code'
        }
        amazon.Login.setClientId('amzn1.application-oa2-client.e5b7827c78f24ffbb9ed01472bf2ef48');
        amazon.Login.authorize(
            options,
            function (response) {
                if (response.error) {
                    alert('oauth error ' + response.error);
                    return;
                }
                $('#amz-authorization-code').text(response.code);
                $.ajax({
                    type: 'POST',
                    url: 'https://api.amazon.com/auth/o2/token',
                    data: {
                        grant_type: 'authorization_code',
                        client_id: 'amzn1.application-oa2-client.e5b7827c78f24ffbb9ed01472bf2ef48',
                        client_secret: 'e589e07398082b36ea6b07c2e73506878771a757a5c8471c650b9fa5dc05cb82',
                        code: response.code
                    },
                    success: function (data) {
                        $('.amz-access-token-input').val(data.access_token);
                        $('#amz-refresh-token').text(data.refresh_token);
                        $('#amz-access-token-expiration-div').removeClass('d-none');
                        $('#amz-access-token-expiration-div span').text(new Date(Date.now() + data.expires_in * 1000));
                    }
                });
            }
        );
        return false;
    });

    $('#lwa-refresh-button').click(function () {
        let refreshToken = $('#amz-refresh-token').text();
        if (refreshToken.length) {
            $.ajax({
                type: 'POST',
                url: 'https://api.amazon.com/auth/o2/token',
                data: {
                    grant_type: 'refresh_token',
                    client_id: 'amzn1.application-oa2-client.e5b7827c78f24ffbb9ed01472bf2ef48',
                    client_secret: 'e589e07398082b36ea6b07c2e73506878771a757a5c8471c650b9fa5dc05cb82',
                    refresh_token: refreshToken
                },
                success: function (data) {
                    $('.amz-access-token-input').val(data.access_token);
                    $('#amz-refresh-token').text(data.refresh_token);
                    $('#amz-access-token-expiration-div').removeClass('d-none');
                    $('#amz-access-token-expiration-div span').text(new Date(Date.now() + data.expires_in * 1000));
                }
            });
        }
    });
})

function load_inventories_script() {
    enablePopover();

    $('#getInventory-button').click(function () {
        $.ajax({
            type: "GET",
            url: "https://fdh28w8kr7.execute-api.us-west-2.amazonaws.com/test/inventories",
            data: {
                skuId: $('#getInventory-skuId').val(),
                locationId: $('#getInventory-locationId').val()
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Amz-Access-Token': $('#amz-access-token-input').val()
            },
            // dataType: "dataType",
            success: function (response) {
                alert('Get Inventory Success!!!')
            },
            error: function (response, status, error) {
                console.log('Response: ' + JSON.stringify(response))
                console.log(status)
                console.log(error)
                alert('Error occurred with status: ' + status + ' and error message: ', error)
            }
        });
    });

    $('#updateInventory-button').click(function () {
        $.ajax({
            type: "PUT",
            url: "https://fdh28w8kr7.execute-api.us-west-2.amazonaws.com/test/inventories",
            data: JSON.stringify({
                skuId: $('#updateInventory-skuId').val(),
                locationId: $('#updateInventory-locationId').val(),
                quantity: $('#updateInventory-quantity').val()
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Amz-Access-Token': $('#amz-access-token-input').val()
            },
            // dataType: "dataType",
            success: function (response) {
                alert('Update Inventory Success!!!')
            },
            error: function (response, status, error) {
                console.log('Response: ' + JSON.stringify(response))
                console.log(status)
                console.log(error)
                alert('Error occurred with status: ' + status + ' and error message: ', error)
            }
        });
    });
}

function load_prices_script () {
    enablePopover();

    $('#updatePrice-button').click(function () {
        $.ajax({
            type: "PUT",
            url: "https://fdh28w8kr7.execute-api.us-west-2.amazonaws.com/test/prices",
            data: JSON.stringify({
                skuId: $('#updatePrice-skuId').val(),
                marketplaceName: $('#updatePrice-marketplaceName').val(),
                channelname: $('#updatePrice-channelname').val(),
                body: JSON.parse($('#updatePrice-body').val())
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Amz-Access-Token': $('#amz-access-token-input').val()
            },
            // dataType: "dataType",
            success: function (response) {
                alert('Update Price Success!!!')
            },
            error: function (response, status, error) {
                console.log('Response: ' + JSON.stringify(response))
                console.log(status)
                console.log(error)
                alert('Error occurred with status: ' + status + ' and error message: ', error)
            }
        });
    });
}

/*******************************************************************************************/

function enablePopover() {
    $('[data-toggle="popover"]').popover();
}

/*******************************************************************************************/
