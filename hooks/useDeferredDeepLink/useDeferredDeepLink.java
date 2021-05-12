// Proceed to android/app/src/main/java/.../MainActivity.Java:

//Facebook Deferred Deep Link -- START
import com.facebook.appevents.AppEventsLogger;
import com.facebook.applinks.AppLinkData;
import android.os.Bundle; // required for onCreate parameter
import android.net.Uri;
import android.util.Log;
import androidx.annotation.Nullable;
import com.facebook.FacebookSdk; //required for initialization
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
//Facebook Deferred Deep Link -- END

public class MainActivity extends ReactActivity {
  //Facebook Deferred Deep Link -- START
  public static final String EVENT_KEY = "JavaDeepLinkToJs"; //"javaToJS"
  public static final String DEEP_LINK_TARGET_URI_KEY = "deepLinkTargetUri";
  public static final String IS_NOT_AVAILABLE = "is not available";
  public static Uri appLinkTargetUri;

  private void emitDeepLinkEventToJs(ReactContext reactContext) {
    Log.d("DeepLink", "emitting Deep Link Event to JS");
    WritableMap eventMap = Arguments.createMap();
    eventMap.putString("type", EVENT_KEY);
    if (appLinkTargetUri != null) {
      Log.d("DeepLink", "appLinkTargetUri: " + appLinkTargetUri);
      eventMap.putString(DEEP_LINK_TARGET_URI_KEY, appLinkTargetUri.toString());
    } else {
      Log.d("DeepLink", "appLinkTargetUri: " + IS_NOT_AVAILABLE);
      eventMap.putString(DEEP_LINK_TARGET_URI_KEY, IS_NOT_AVAILABLE);
    }

    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(EVENT_KEY, eventMap);
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    FacebookSdk.setAutoInitEnabled(true);
    FacebookSdk.fullyInitialize();
    AppEventsLogger.activateApp(getApplication());
    Log.d("DeepLink", "FacebookSdk.isInitialized(): " + FacebookSdk.isInitialized());
    AppLinkData.fetchDeferredAppLinkData(this,
            new AppLinkData.CompletionHandler() {
              @Override
              public void onDeferredAppLinkDataFetched(@Nullable AppLinkData appLinkData) {
                Log.d(
                        "DeepLink",
                        "FacebookSdk.isInitialized() (inside onDeferredAppLinkDataFetched): " + FacebookSdk.isInitialized());
                if (appLinkData != null) {
                  appLinkTargetUri = appLinkData.getTargetUri();
                  Log.d("DeepLink", "appLinkData != null. Event with appLinkData is being emitted to JS");
                  ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
                  Log.d("DeepLink", "reactContext pre-timer: " + reactContext);
                  TimerTask task = new TimerTask() {
                    public void run() {
                      System.out.println("Task performed on: " + new Date() + "\n" +
                              "Thread's name: " + Thread.currentThread().getName());
                      Log.d("DeepLink", "reactContext in-timer: " + reactContext);
                      emitDeepLinkEventToJs(reactContext);
                    }
                  };
                  Timer timer = new Timer("Timer");

                  long delay = 1000L;
                  timer.schedule(task, delay);
                  Log.d("DeepLink", "appLinkData (inside onDeferredAppLinkDataFetched()): " + appLinkData);
                  Log.d("DeepLink", "appLinkData.getTargetUri() (appLinkTargetUri) (inside onDeferredAppLinkDataFetched()): " + appLinkTargetUri);
                }
              }
            });
    Log.d("DeepLink", "appLinkData.getTargetUri() result: " + appLinkTargetUri);
  }
  //Facebook Deferred Deep Link -- END
  ...
}
