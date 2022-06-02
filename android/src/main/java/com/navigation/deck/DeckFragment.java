package com.navigation.deck;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.Lifecycle;

import com.navigation.androidx.AwesomeFragment;
import com.navigation.androidx.FragmentHelper;
import com.navigation.androidx.StackFragment;

public class DeckFragment extends AwesomeFragment {

    private static final String SAVED_STATE_BOTTOM_TAG = "deck_bottom_tag";
    private static final String SAVED_STATE_TOP_TAG = "deck_top_tag";

    private String bottomTag;
    private String topTag;

    private AwesomeFragment bottomFragment;
    private AwesomeFragment topFragment;

    @Override
    public boolean isParentAwesomeFragment() {
        return true;
    }

    @Override
    protected AwesomeFragment childFragmentForAppearance() {
        return (AwesomeFragment) getChildFragmentManager().findFragmentById(R.id.top);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.nav_fragment_deck, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        if (savedInstanceState == null) {
            if (bottomFragment == null || topFragment == null) {
                throw new IllegalArgumentException("必须设定 first and second deck");
            }
            FragmentHelper.addFragment(getChildFragmentManager(), R.id.bottom, bottomFragment, Lifecycle.State.RESUMED, false);
            FragmentHelper.addFragment(getChildFragmentManager(), R.id.top, topFragment, Lifecycle.State.RESUMED, true);
        } else {
            bottomTag = savedInstanceState.getString(SAVED_STATE_BOTTOM_TAG);
            topTag = savedInstanceState.getString(SAVED_STATE_TOP_TAG);
            bottomFragment = (AwesomeFragment) getChildFragmentManager().findFragmentByTag(bottomTag);
            topFragment = (AwesomeFragment) getChildFragmentManager().findFragmentByTag(topTag);
        }
        if (topFragment != null) {
            topFragment.setDefinesPresentationContext(true);
        }
    }
    
    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString(SAVED_STATE_BOTTOM_TAG, bottomTag);
        outState.putString(SAVED_STATE_TOP_TAG, topTag);
    }

    @Nullable
    @Override
    public StackFragment getStackFragment() {
        if (!topFragment.isAdded()) {
            return null;
        }
        return topFragment.getStackFragment();
    }
    
    public void setBottomFragment(AwesomeFragment bottomFragment) {
        this.bottomFragment = bottomFragment;
        this.bottomTag = bottomFragment.getSceneId();
    }
    
    public void setTopFragment(AwesomeFragment topFragment) {
        this.topFragment = topFragment;
        this.topTag = topFragment.getSceneId();
    }

    public AwesomeFragment getBottomFragment() {
        return bottomFragment;
    }

    public AwesomeFragment getTopFragment() {
        return topFragment;
    }

    public AwesomeFragment getPrimaryFragment() {
        return (AwesomeFragment) getChildFragmentManager().findFragmentById(R.id.top);
    }

}
