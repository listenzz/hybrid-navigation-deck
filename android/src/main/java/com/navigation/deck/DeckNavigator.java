package com.navigation.deck;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.navigation.androidx.AwesomeFragment;
import com.reactnative.hybridnavigation.HybridFragment;
import com.reactnative.hybridnavigation.Navigator;
import com.reactnative.hybridnavigation.ReactBridgeManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class DeckNavigator implements Navigator {
    private final List<String> supportActions = Collections.emptyList();

    @Override
    @NonNull
    public String name() {
        return "deck";
    }

    @Override
    @NonNull
    public List<String> supportActions() {
        return supportActions;
    }

    @Nullable
    @Override
    public AwesomeFragment createFragment(@NonNull ReadableMap layout) {
        if (!layout.hasKey(name())) {
            return null;
        }
        ReadableMap deck = layout.getMap(name());
        assert deck != null;
        ReadableArray children = deck.getArray("children");
        assert children != null;
        if (children.size() != 2) {
            throw new IllegalArgumentException("必须指定长度为 2 的 children");
        }

        ReadableMap bottom = children.getMap(0);
        ReadableMap top = children.getMap(1);
        AwesomeFragment bottomFragment = getReactBridgeManager().createFragment(bottom);
        AwesomeFragment topFragment = getReactBridgeManager().createFragment(top);
        assert bottomFragment != null;
        assert topFragment != null;
        DeckFragment deckFragment = new DeckFragment();
        deckFragment.setBottomFragment(bottomFragment);
        deckFragment.setTopFragment(topFragment);
        
        return deckFragment;
    }

    @Nullable
    @Override
    public Bundle buildRouteGraph(@NonNull AwesomeFragment fragment) {
        if (!(fragment instanceof DeckFragment)) {
            return null;
        }

        DeckFragment deck = (DeckFragment) fragment;
        ArrayList<Bundle> children = new ArrayList<>();
        List<AwesomeFragment> fragments = deck.getChildAwesomeFragments();
        for (int i = 0; i < fragments.size(); i++) {
            AwesomeFragment child = fragments.get(i);
            Bundle r = getReactBridgeManager().buildRouteGraph(child);
            if (r != null) {
                children.add(r);
            }
        }

        Bundle graph = new Bundle();
        graph.putString("layout", name());
        graph.putString("sceneId", fragment.getSceneId());
        graph.putParcelableArrayList("children", children);
        graph.putString("mode", Navigator.Util.getMode(fragment));

        return graph;
    }

    @Override
    public HybridFragment primaryFragment(@NonNull AwesomeFragment fragment) {
        if (fragment instanceof DeckFragment) {
            DeckFragment deckFragment = (DeckFragment) fragment;
            return getReactBridgeManager().primaryFragment(deckFragment.getTopFragment());
        }
        return null;
    }

    @Override
    public void handleNavigation(@NonNull AwesomeFragment target, @NonNull String action, @NonNull ReadableMap extras, @NonNull Promise promise) {
        promise.resolve(false);
    }

    private ReactBridgeManager getReactBridgeManager() {
        return ReactBridgeManager.get();
    }
}
