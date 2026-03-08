<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

Route::post('/login',[AuthController::class,'login']);
Route::post('/signup',[AuthController::class,'signup']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']); 

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/users',[UserController::class,'index']);
    Route::post('/users',[UserController::class,'store']);
    Route::put('/users/{id}',[UserController::class,'update']);
    Route::delete('/users/{id}', [UserController::class,'destroy']);   

});