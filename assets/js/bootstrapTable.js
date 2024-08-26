$(window).ready(() => {
  initTable();
});

const $table = $("#table");
const $remove = $("#remove");
let selections = [];

function getIdSelections() {
  return $.map($table.bootstrapTable("getSelections"), function (row) {
    return row.productId;
  });
}

function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.productId, selections) !== -1;
  });
  return res;
}

function detailFormatter(index, row) {
  var html = [];
  $.each(row, function (key, value) {
    html.push("<p><b>" + key + ":</b> " + value + "</p>");
  });
  return html.join("");
}

function operateFormatter(value, row, index) {
  return [
    '<a class="like" href="javascript:void(0)" title="Like">',
    '<i class="fa fa-heart"></i>',
    "</a>  ",
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    "</a>",
  ].join("");
}

window.operateEvents = {
  "click .like": function (e, value, row, index) {
    alert("You click like action, row: " + JSON.stringify(row));
  },
  "click .remove": function (e, value, row, index) {
    $table.bootstrapTable("remove", {
      field: "productId",
      values: [row.productId],
    });
  },
};

function initTable() {
  $table2.bootstrapTable("destroy");
  $table.bootstrapTable("destroy").bootstrapTable({
    locale: "th-TH",
    columns: [
      [
        {
          field: "state",
          checkbox: true,
          rowspan: 2,
          align: "center",
          valign: "middle",
        },
        {
          title: "รหัสสินค้า",
          field: "productId",
          rowspan: 2,
          align: "center",
          valign: "middle",
          sortable: true,
          // footerFormatter: totalTextFormatter,
        },
        {
          field: "name",
          title: "ชื่อสินค้า",
          sortable: true,
          // footerFormatter: totalNameFormatter,
          align: "center",
        },
        {
          field: "price",
          title: "ราคาสินค้า",
          sortable: true,
          align: "center",
          // footerFormatter: totalPriceFormatter,
        },
      ],
      [],
    ],
  });
  $table.on(
    "check.bs.table uncheck.bs.table " +
      "check-all.bs.table uncheck-all.bs.table",
    function () {
      $remove.prop("disabled", !$table.bootstrapTable("getSelections").length);

      // save your data, here just save the current page
      selections = getIdSelections();
      // push or splice the selections if you want to save all data selections
    }
  );
  $table.on("all.bs.table", function (e, name, args) {
    // console.log(name, args);
  });
  $remove.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable("remove", {
      field: "productId",
      values: ids,
    });
    $remove.prop("disabled", true);
  });
}
