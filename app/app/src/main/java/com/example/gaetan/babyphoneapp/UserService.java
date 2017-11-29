package com.example.gaetan.babyphoneapp;

import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface UserService {
    @FormUrlEncoded
    @POST("/login")
    String loginUser(@Field("email") String email, @Field("password") String password);
}
