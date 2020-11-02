import * as util from './util.js';
import * as constant from './constant.js'

export function load_events_script () {
    util.enablePopover();
    $('#createEventsSubscription-button').click(clickCreateEventsSubscriptionButtonCallback);
    $('#deleteEventsSubscription-button').click(clickDeleteEventsSubscriptionButtonCallback);
    $('#getEventsSubscription-button').click(clickGetEventsSubscriptionButtonCallback);
    $('#updateEventsSubscription-button').click(clickUpdateEventsSubscriptionButtonCallback);
}

function clickCreateEventsSubscriptionButtonCallback() {
    $.ajax({
        type: "POST",
        url: constant.API_INVOKE_URL + '/events/subscriptions',
        data: JSON.stringify({
            body: JSON.parse($('#createEventsSubscription-body').val())
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickDeleteEventsSubscriptionButtonCallback() {
    $.ajax({
        type: "DELETE",
        url: constant.API_INVOKE_URL + '/events/subscriptions',
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickGetEventsSubscriptionButtonCallback() {
    $.ajax({
        type: "GET",
        url: constant.API_INVOKE_URL + '/events/subscriptions',
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickUpdateEventsSubscriptionButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/events/subscriptions',
        data: JSON.stringify({
            body: JSON.parse($('#updateEventsSubscription-body').val())
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}