$(document).ready(function () {
    var _this = {};
    //run code here
    init();


    function init() {
        getElements();
        bindListeners();
    }

    function getElements() {
        _this.element = $('.container');
    }

    function bindListeners() {
        _this.element.find('.add-library .btnAdd').on('click', function () {
            var textName = _this.element.find('.txtName').val();

            console.log(textName);
            if (textName.length > 0) {
                _this.addLibraryName({name: textName, timestamp: Date.now()});
            }
        });
    }

    _this.addLibraryName = function (name) {
        $.post('http://localhost:3000/library', name).then(function() {
            console.log('success');
        }, function () {
            console.error('failure');
        });
    }
});