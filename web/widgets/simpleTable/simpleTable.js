define(['jquery'], function ($) {
    'use strict';

    class SimpleTable {
        options = {
            columns: [],
            data: [],
            useId: 'id'
        };

        constructor(options, element) {
            this.options = $.extend(this.options, options);
            this.element = element ? this.element : $(document.createElement('div'));

            this._renderLayout();
            this._bindListeners();
        }

        _renderLayout() {
            this.element.html(this._drawTable());
            this.element.addClass('simpleTable');
            this.$header = $(this.element.find('.primary-header-row'));
            this._updateHeaderColumns();
            this.$viewport = $(this.element.find('tbody'));
            this._renderData();
        }

        _updateHeaderColumns() {
            let _this = this;
            this.options.columns.forEach(function(colInfo) {
                let $column;
                if (colInfo.visible) {
                    return;
                }
                $column = $(`<th class="column-header">
                        <div class="column ${colInfo.className}">${colInfo.title}</div>
                    </th>`);
                $column.width(colInfo.width);
                _this.$header.append($column);
            });
        }

        _renderData() {
            let _this = this, cols = this.options.columns;

            if (this.options.data.length === 0) {
                this.$viewport.append('<tr class="section no-data"><div>No Data available</div></tr>');
            } else {
                this.options.data.forEach(parseRows);
            }

            function parseRows(dataInfo, rowNum) {
                let className = rowNum % 2 ? 'section even': 'section odd',
                    $row = $(`<tr class="${className}" data-id="${dataInfo[_this.options.useId]}"></tr>`);

                cols.forEach(function(columnInfo, colNum) {
                    let $col = $(document.createElement('td'));

                    $col.html(`<div class="cell"></div>`);
                    if (columnInfo.hasOwnProperty('formatter') && typeof columnInfo.formatter === 'function') {
                        $col.find('cell').html(columnInfo.formatter(dataInfo, rowNum, colNum, columnInfo));
                    } else {
                        $col.find('cell').html(`<div>${dataInfo[columnInfo.id]}</div>`);
                    }
                    $row.append($col);
                });

                _this.$viewport.append($row);
            }
        }

        _drawTable() {
            return `<table><thead><tr class="primary-header-row"></tr></thead><tbody><tr class="no-data-row">
                    <div>No Data Available</div>
                    </tr></tbody></table>`;
        }

        _destroy() {
            this.element.remove();
            delete this;
        }

        _bindListeners() {

        }
    }

    return SimpleTable;
});