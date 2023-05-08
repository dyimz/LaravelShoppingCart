<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customer/all',['uses' => 'CustomerController@getCustomerAll','as' => 'customer.getcustomerall'] );
Route::post('/customer',['uses' => 'CustomerController@store','as' => 'customer.store'] );
Route::get('/customer/{id}/edit',['uses' => 'CustomerController@edit','as' => 'customer.edit'] );
Route::patch('/customer/{id}',['uses' => 'CustomerController@update','as' => 'customer.update'] );
Route::delete('/customer/{id}',['uses' => 'CustomerController@destroy','as' => 'customer.destroy'] );
Route::get('/getItems',['uses' => 'ItemController@getItems','as' => 'items.getItems'] );

Route::resource('item', 'ItemController');

Route::post('/customer/search',['uses' => 'CustomerController@search','as' => 'customer.search'] );
Route::get('/customer/{id}',['uses' => 'CustomerController@show','as' => 'customer.show'] );
Route::get('/item/search/{term?}',['uses' => 'ItemController@search','as' => 'item.search'] );

Route::post('/item/checkout',[
        'uses' => 'ItemController@postCheckout',
        'as' => 'checkout'
    ]);
