package com.navigation.deck.example;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatDelegate;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeApplicationEntryPoint;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.navigation.deck.DeckNavigator;
import com.reactnative.hybridnavigation.ReactManager;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

	private final ReactNativeHost reactNativeHost = new DefaultReactNativeHost(this) {
		@Override
		public List<ReactPackage> getPackages() {
			List<ReactPackage> packages = new PackageList(this).getPackages();
			return packages;
		}

		@NonNull
		@Override
		public String getJSMainModuleName() {
			return "index";
		}

		@Override
		public boolean getUseDeveloperSupport() {
			return BuildConfig.DEBUG;
		}

		@Override
		public boolean isNewArchEnabled() {
			return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
		}

		@Override
		public boolean isHermesEnabled() {
			return BuildConfig.IS_HERMES_ENABLED;
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return reactNativeHost;
	}

	@NonNull
	@Override
	public ReactHost getReactHost() {
		return DefaultReactHost.getDefaultReactHost(getApplicationContext(), reactNativeHost, null);
	}

	@Override
	public void onCreate() {
		super.onCreate();
		ReactNativeApplicationEntryPoint.loadReactNative(this);

		ReactManager reactManager = ReactManager.get();
		reactManager.install(getReactHost());
		reactManager.registerNavigator(new DeckNavigator());
		FLog.setMinimumLoggingLevel(FLog.INFO);

		AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
	}
}
