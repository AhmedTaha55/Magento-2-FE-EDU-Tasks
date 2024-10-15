define([
    'jquery'
], function ($) {
    'use strict';

    return function (sidebar) {
        $.widget('mage.sidebar', sidebar, {
            _initContent: function () {
                var self = this;

                // Override the 'remove' button click event
                $(this.options.minicart).on('click', '[data-action="delete"]', function (event) {
                    event.preventDefault();
                    
                    var itemId = $(this).data('cart-item');
                    
                    // Remove item from cart without confirmation
                    self._removeItem(itemId);
                });
            },
            
            _removeItem: function (itemId) {
                // Trigger AJAX request to delete item from cart without confirmation
                $.ajax({
                    url: this.options.removeItemUrl,
                    type: 'POST',
                    data: {id: itemId},
                    dataType: 'json',
                    success: function () {
                        // Reload minicart content after removing item
                        $(this.options.minicart).trigger('contentUpdated');
                    }.bind(this)
                });
            }
        });

        return $.mage.sidebar;
    };
});
