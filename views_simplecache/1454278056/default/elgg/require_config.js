// <script>
require = {
    "baseUrl": "http://projectcuria.com/cache/1454278056/default/",
    "paths": {
        "jquery.treeview": [
            "http://projectcuria.com/mod/pages/vendors/jquery-treeview/jquery.treeview.min"
        ]
    },
    "shim": {
        "jquery.ui.autocomplete.html": {
            "deps": [
                "jquery-ui"
            ]
        },
        "ckeditor": {
            "exports": "CKEDITOR"
        },
        "jquery.ckeditor": {
            "deps": [
                "jquery",
                "ckeditor"
            ],
            "exports": "jQuery.fn.ckeditor"
        },
        "jquery.treeview": {
            "deps": [
                "jquery"
            ],
            "exports": "jQuery.fn.treeview"
        }
    },
    "waitSeconds": 20
};

