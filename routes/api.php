<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Necessary routes to register in SECREA
 */
Route::get('getuniversity','UniversityController@allData');

/**
 * Routes with authentication-api
 */
Route::middleware('auth:api')->group(function () {

    /** Each user modifies their profile */
    Route::get('/profiles/auth', 'ProfilesController@show');
    Route::patch('/profiles', 'ProfilesController@update');

    /** Authenticated user **/
    Route::get('/users/check-auth', 'UserController@checkAuth');
    Route::patch('/users/password', 'UserController@updatePassword');

    /** *Users */
    Route::get('/users/role/{role}', 'UserController@byRole')->middleware('has.permission:users-index');
    Route::patch('/users/{user}/status', 'UserController@updateStatus')->middleware('has.permission:users-update');
    Route::apiResource('/users', 'UserController')->middleware('auth.permission')->only(['store', 'update', 'show', 'destroy']);

    /** Roles */
    Route::get('/roles/{role}/permission', 'RoleController@getPermissions')->middleware('has.permission:roles-show');
    Route::post('/roles/{role}/addPermission', 'RoleController@assignPermission')->middleware('has.permission:roles-update');
    Route::delete('/roles/{role}/removePermission', 'RoleController@revokePermission')->middleware('has.permission:roles-update');
    Route::apiResource('roles', 'RoleController')->middleware('auth.permission');

    /**  Permissions */
    Route::get('/permissions/role/{role}', 'PermissionController@byRole')->middleware('has.permission:roles-show');
    Route::get('/permissions/not/role/{role}', 'PermissionController@notBelongToRole')->middleware('has.permission:roles-show');

    /** Session type */
    Route::get('/sessiontypes/all', 'SessionTypeController@all');
    Route::apiResource('sessiontypes', 'SessionTypeController')->middleware('auth.permission');

    
});

