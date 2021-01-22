import * as util from './util.js';
import * as constant from './constant.js'

export function load_orders_script() {
    util.enablePopover();

    $('#confirmOrder-button').click(clickConfirmOrderButtonCallback);
    $('#rejectOrder-button').click(clickRejectOrderButtonCallback);
    $('#getOrder-button').click(clickGetOrderButtonCallback);
    $('#listOrders-button').click(clickListOrdersButtonCallback);
    $('#shipOrder-button').click(clickShipOrderButtonCallback);
    $('#generateInvoice-button').click(clickGenerateInvoiceButtonCallback);
    $('#retrieveInvoice-button').click(clickRetrieveInvoiceButtonCallback);
    $('#createPackages-button').click(clickCreatePackagesButtonCallback);
    $('#updatePackages-button').click(clickUpdatePackagesButtonCallback);
    $('#retrieveShipLabel-button').click(clickRetrieveShipLabelButtonCallback);
    $('#generateShipLabel-button').click(clickGenerateShipLabelButtonCallback);
    $('#regenerateShipLabel-button').click(clickRegenerateShipLabelButtonCallback);
    $('#retrievePickupSlots-button').click(clickRetrievePickupSlotsButtonCallback);
}

function clickConfirmOrderButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/confirm-order',
        data: JSON.stringify({
            orderId: $('#confirmOrder-orderId').val()
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickRejectOrderButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/reject-order',
        data: JSON.stringify({
            orderId: $('#rejectOrder-orderId').val(),
            body: JSON.parse($('#rejectOrder-body').val())
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickGetOrderButtonCallback() {
    $.ajax({
        type: "GET",
        url: constant.API_INVOKE_URL + '/orders/get-order',
        data: {
            orderId: $('#getOrder-orderId').val(),
        },
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickShipOrderButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/ship-order',
        data: JSON.stringify({
            orderId: $('#shipOrder-orderId').val(),
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickGenerateInvoiceButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/generate-invoice',
        data: JSON.stringify({
            orderId: $('#generateInvoice-orderId').val(),
        }),
        headers: constant.GET_HEADERS(),
        success: (response, status, error) => {
            util.invokeApiSuccessCallback
            let pdfData = 'data:application/pdf;base64,' + response['fileData']['decryptedValue']
            let newWindow = window.open('about:blank');
            let image = new Image();
            image.src = pdfData;
            setTimeout(function () {
                newWindow.document.write(image.outerHTML);
            }, 0);
        },
        error: util.invokeApiErrorCallback
    });
}

function clickRetrieveInvoiceButtonCallback() {
    $.ajax({
        type: "GET",
        url: constant.API_INVOKE_URL + '/orders/retrieve-invoice',
        data: {
            orderId: $('#retrieveInvoice-orderId').val(),
        },
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickListOrdersButtonCallback() {
    $.ajax({
        type: "GET",
        url: constant.API_INVOKE_URL + '/orders/list-orders',
        data: {
            locationId: $('#listOrders-locationId').val(),
            status: $('#listOrders-status').val(),
            fromTimestamp: $('#listOrders-fromTimestamp').val(),
            toTimestamp: $('#listOrders-toTimestamp').val(),
            cursor: $('#listOrders-cursor').val(),
            maxResults: $('#listOrders-maxResults').val(),
        },
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickCreatePackagesButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/create-packages',
        data: JSON.stringify({
            orderId: $('#createPackages-orderId').val(),
            body: JSON.parse($('#createPackages-body').val())
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickUpdatePackagesButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/update-packages',
        data: JSON.stringify({
            orderId: $('#updatePackages-orderId').val(),
            body: JSON.parse($('#updatePackages-body').val())
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickRetrieveShipLabelButtonCallback() {
    $.ajax({
        type: "GET",
        url: constant.API_INVOKE_URL + '/orders/retrieve-ship-label',
        data: {
            orderId: $('#retrieveShipLabel-orderId').val(),
            packageId: $('#retrieveShipLabel-packageId').val()
        },
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickRetrievePickupSlotsButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/retrieve-pickup-slots',
        data: JSON.stringify({
            orderId: $('#retrievePickupSlots-orderId').val(),
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}

function clickGenerateShipLabelButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/generate-ship-label',
        data: JSON.stringify({
            orderId: $('#generateShipLabel-orderId').val(),
            packageId: $('#generateShipLabel-packageId').val(),
            pickupTimeSlotId: $('#generateShipLabel-pickupTimeSlotId').val()
        }),
        headers: constant.GET_HEADERS(),
        success: (response, status, error) => {
            util.invokeApiSuccessCallback
            let format = response['fileData']['format']
            let data = 'data:image/' + format + ';base64,' + response['fileData']['decryptedValue']
            let newWindow = window.open('about:blank');
            let image = new Image();
            image.src = data;
            setTimeout(function () {
                newWindow.document.write(image.outerHTML);
            }, 0);
        },
        error: util.invokeApiErrorCallback
    });
}

function clickRegenerateShipLabelButtonCallback() {
    $.ajax({
        type: "PUT",
        url: constant.API_INVOKE_URL + '/orders/regenerate-ship-label',
        data: JSON.stringify({
            orderId: $('#regenerateShipLabel-orderId').val(),
            packageId: $('#regenerateShipLabel-packageId').val(),
            pickupTimeSlotId: $('#regenerateShipLabel-pickupTimeSlotId').val()
        }),
        headers: constant.GET_HEADERS(),
        success: util.invokeApiSuccessCallback,
        error: util.invokeApiErrorCallback
    });
}
