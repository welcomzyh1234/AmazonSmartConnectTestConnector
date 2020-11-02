'use strict'

import * as orders from './orders.js';
import * as events from './events.js';
import * as prices from './prices.js';
import * as inventories from './inventories.js';

$(function () {
    $("#inventories-row").load("html/inventories.html", inventories.load_inventories_script);
    $("#prices-row").load("html/prices.html", prices.load_prices_script);
    $("#orders-row").load("html/orders.html", orders.load_orders_script);
    $("#events-row").load("html/events.html", events.load_events_script);

    window.onAmazonLoginReady = function () {
        console.log('[INFO] Amazon Login Ready');
    };

    load_login_with_amazon_script();

    $('#lwa-login-button').click(click_lwa_login_button_callback);

    $('#lwa-refresh-button').click(click_lwa_fresh_button_callback);
})

/*******************************************************************************************/

function load_login_with_amazon_script() {
    $(
        '<script>',
        {
            type: 'text/javascript',
            async: true,
            src: 'https://assets.loginwithamazon.com/sdk/na/login1.js'
        }
    ).appendTo($('#amazon-root'));
}

function click_lwa_login_button_callback() {
    const options = {
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
    amazon.Login.setClientId('amzn1.application-oa2-client.4bfd7ea0644340938c903ed7311be666');
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
                    client_id: 'amzn1.application-oa2-client.4bfd7ea0644340938c903ed7311be666',
                    client_secret: 'a1e6145d7f47f6e955218c83c418102efbd76775579059d5ccf7473f5fa12fb8',
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
}

function click_lwa_fresh_button_callback() {
    let refreshToken = $('#amz-refresh-token').text();
    if (refreshToken.length) {
        $.ajax({
            type: 'POST',
            url: 'https://api.amazon.com/auth/o2/token',
            data: {
                grant_type: 'refresh_token',
                client_id: 'amzn1.application-oa2-client.4bfd7ea0644340938c903ed7311be666',
                client_secret: 'a1e6145d7f47f6e955218c83c418102efbd76775579059d5ccf7473f5fa12fb8',
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
}

/*******************************************************************************************/
