package app.babyphone;

public class Api {
    private static String token;

    public static String getToken() {
        return token;
    }

    public static void setToken(String token) {
        Api.token = token;
    }
}
