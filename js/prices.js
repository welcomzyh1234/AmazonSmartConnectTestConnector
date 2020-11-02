import * as util from './util.js';
import * as constant from './constant.js'

export function load_prices_script () {
    util.enablePopover();

    $('#updatePrice-button').click(function () {
        $.ajax({
            type: "PUT",
            url: constant.API_INVOKE_URL + "/prices",
            data: JSON.stringify({
                skuId: $('#updatePrice-skuId').val(),
                marketplaceName: $('#updatePrice-marketplaceName').val(),
                channelname: $('#updatePrice-channelname').val(),
                body: JSON.parse($('#updatePrice-body').val())
            }),
            headers: constant.GET_HEADERS(),
            success: util.invokeApiSuccessCallback,
            error: util.invokeApiErrorCallback
        });
    });
}