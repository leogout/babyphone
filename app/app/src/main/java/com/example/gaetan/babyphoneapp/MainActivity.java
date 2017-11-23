package com.example.gaetan.babyphoneapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import retrofit2.Retrofit;


public class MainActivity extends AppCompatActivity {
    final String EXTRA_LOG = "log";
    final String EXTRA_PASSWORD = "psw";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void check(View view) {
//        EditText email = (EditText) findViewById(R.id.email);
//        EditText password = (EditText) findViewById(R.id.password);
//        Retrofit retrofit = new Retrofit.Builder()
//                .baseUrl("http://localhost:8000/")
//                .build();
//
//        UserService service = retrofit.create(UserService.class);
//
//        String resp = service.loginUser(email.getText().toString(), password.getText().toString());
//
//        Log.i("response : ", resp);

        startActivity(new Intent(this, Check.class));
    }
}
