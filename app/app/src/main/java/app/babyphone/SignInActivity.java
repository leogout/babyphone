package app.babyphone;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.scalars.ScalarsConverterFactory;


public class SignInActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_in);
    }

    public void check(View view) {
        EditText email = (EditText) findViewById(R.id.email);
        EditText password = (EditText) findViewById(R.id.password);
        final TextView errorText = (TextView) findViewById(R.id.errorText);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://f888ea93.ngrok.io/")
                .addConverterFactory(ScalarsConverterFactory.create())
                .build();

        UserService service = retrofit.create(UserService.class);

        final SignInActivity current = this;

        service.signinUser(email.getText().toString(), password.getText().toString())
                .enqueue(new Callback<String>() {
                    @Override
                    public void onResponse(Call<String> call, Response<String> response) {
                        JsonParser parser = new JsonParser();

                        if(response.isSuccessful()) {
                            Log.i("response", "post submitted to API." + response.body().toString());

                            JsonObject o = parser.parse(response.body().toString()).getAsJsonObject();
                            Api.setToken(o.get("data").getAsJsonObject().get("token").getAsString());
                            Log.i("token ", Api.getToken());
                            startActivity(new Intent(current, CheckActivity.class));
                            finish();
                        } else {
                            try {
                                JsonObject o = parser.parse(response.errorBody().string()).getAsJsonObject();
                                errorText.setText(o.get("error").getAsString());
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<String> call, Throwable t) {
                        Log.e("error", t.getLocalizedMessage());
                        Log.e("error", t.getMessage());
                    }
                });

//        Log.i("response : ", resp);

    }
    public void signUp(View view) {
        startActivity(new Intent(this, SignUpActivity.class));
        finish();
    }
}
