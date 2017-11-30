package com.example.gaetan.babyphoneapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void check(View view) {
        EditText email = (EditText) findViewById(R.id.email);
        EditText babyphoneId = (EditText) findViewById(R.id.babyphoneId);
        EditText password = (EditText) findViewById(R.id.password);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://abe4168e.ngrok.io/")
                .addConverterFactory(ScalarsConverterFactory.create())
                .build();

        UserService service = retrofit.create(UserService.class);

        Log.i("email: ", email.getText().toString());
        Log.i("babyphoneId: ", babyphoneId.getText().toString());
        Log.i("passw: ", password.getText().toString());

        service.signupUser(email.getText().toString(), password.getText().toString(), babyphoneId.getText().toString())
                .enqueue(new Callback<String>() {
                    @Override
                    public void onResponse(Call<String> call, Response<String> response) {
                        Log.i("response: ", "post submitted to API." + response.body().toString());
                        if(response.isSuccessful()) {
                            Log.i("response: ", "post submitted to API." + response.body().toString());
                        }
                    }

                    @Override
                    public void onFailure(Call<String> call, Throwable t) {
                        Log.e("error", t.getLocalizedMessage());
                        Log.e("error", t.getMessage());
                    }
                });

//        Log.i("response : ", resp);

        startActivity(new Intent(this, Check.class));
    }
}
