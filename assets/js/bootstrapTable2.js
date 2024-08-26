$(window).ready(() => {
  // initTable2();
});

const $table2 = $("#table2");
const $remove2 = $("#remove2");
let selections2 = [];

function getIdselections2() {
  return $.map($table2.bootstrapTable("getselections2"), function (row) {
    return row.warehouseId;
  });
}

function responseHandler2(res) {
  console.log(res);

  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.warehouseId, selections2) !== -1;
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
    $table2.bootstrapTable("remove", {
      field: "warehouseId",
      values: [row.warehouseId],
    });
  },
};

function initTable2() {
  $table.bootstrapTable("destroy");
  $table2.bootstrapTable("destroy").bootstrapTable({
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
          title: "รหัสคลังสินค้า",
          field: "warehouseId",
          rowspan: 2,
          align: "center",
          valign: "middle",
          sortable: true,
          // footerFormatter: totalTextFormatter,
        },
        {
          title: "ชื่อคลังสินค้า",
          field: "name",
          rowspan: 2,
          align: "center",
          valign: "middle",
          sortable: true,
          // footerFormatter: totalTextFormatter,
        },
        {
          title: "ดูแลโดย",
          field: "authorizer",
          rowspan: 2,
          align: "center",
          valign: "middle",
          sortable: true,
          // footerFormatter: totalTextFormatter,
        },
      ],
      [
        // {
        //   field: "operate",
        //   title: "Item Operate",
        //   align: "center",
        //   clickToSelect: false,
        //   events: window.operateEvents,
        //   formatter: operateFormatter,
        // },
      ],
    ],
  });
  $table2.on(
    "check.bs.table uncheck.bs.table " +
      "check-all.bs.table uncheck-all.bs.table",
    function () {
      $remove2.prop(
        "disabled",
        !$table2.bootstrapTable("getselections2").length
      );

      // save your data, here just save the current page
      selections2 = getIdselections2();
      // push or splice the selections2 if you want to save all data selections2
    }
  );
  $table2.on("all.bs.table", function (e, name, args) {
    // console.log(name, args);
  });
  $remove2.click(function () {
    var ids = getIdselections2();
    $table2.bootstrapTable("remove", {
      field: "warehouseId",
      values: ids,
    });
    $remove2.prop("disabled", true);
  });
}
