package app.babyphone;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class CheckActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.check);

        TextView logDisplay = (TextView) findViewById(R.id.log);
        TextView pswDisplay = (TextView) findViewById(R.id.psw);

        logDisplay.setText(Api.getToken());
        pswDisplay.setText("coucou");

    }
}
