package com.example.gaetan.babyphoneapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class Check extends AppCompatActivity {
    final String EXTRA_LOG = "log";
    final String EXTRA_PASSWORD = "psw";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.check);

        Intent intent = getIntent();
        TextView logDisplay = (TextView) findViewById(R.id.log);
        TextView pswDisplay = (TextView) findViewById(R.id.psw);

        if (intent != null) {
            logDisplay.setText(intent.getStringExtra(EXTRA_LOG));
            pswDisplay.setText(intent.getStringExtra(EXTRA_PASSWORD));
        }

    }
}
