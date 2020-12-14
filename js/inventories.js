import * as util from './util.js';
import * as constant from './constant.js'

export function load_inventories_script() {
    util.enablePopover();

    $('#getInventory-button').click(function () {
        $.ajax({
            type: "GET",
            url: constant.API_INVOKE_URL + '/inventories',
            data: {
                skuId: $('#getInventory-skuId').val(),
                locationId: $('#getInventory-locationId').val()
            },
            headers: constant.GET_HEADERS(),
            success: util.invokeApiSuccessCallback,
            error: util.invokeApiErrorCallback
        });
    });

    $('#updateInventory-button').click(function () {
        $.ajax({
            type: "PUT",
            url: constant.API_INVOKE_URL + '/inventories',
            data: JSON.stringify({
                skuId: $('#updateInventory-skuId').val(),
                locationId: $('#updateInventory-locationId').val(),
                quantity: $('#updateInventory-quantity').val(),
                inventoryUpdateSequence: $('#updateInventory-inventoryUpdateSequence').val()
            }),
            headers: constant.GET_HEADERS(),
            success: util.invokeApiSuccessCallback,
            error: util.invokeApiErrorCallback
        });
    });
}