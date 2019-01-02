/*******************************************************
                                DEPENDENCIES GLOBALS
 ******************************************************/
/**
 * ADMIN4B: Template free
 * ! already include bootstrap(js,css,popper)
 */
require('admin4b/dist/admin4b.min.js'); 


/**
 * ALERTIFY: Config
 */
window.alertify                         = require('alertifyjs');
window.alertify.defaults.glossary.title = "NOTA20";
window.alertify.defaults.theme.ok       = "btn btn-orange";
window.alertify.defaults.theme.cancel   = "btn btn-light";

/**
 * TOASTR: Notification-config
 */
import toastr from 'toastr/build/toastr.min';
window.toastr                       = toastr;
window.toastr.options.progressBar   = true;
window.toastr.options.positionClass = "toast-bottom-right";
window.toastr.options.timeOut       = 4000;



