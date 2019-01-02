/*********************************************************************************
 *                                                                     Vanilla JS:
 *********************************************************************************/

var appName = document.head.querySelector('meta[name="app-name"]').content
if (appName){
    window.dev =  {
        appName
    }
}else
    console.error('Verified file: vanilla/main.js')