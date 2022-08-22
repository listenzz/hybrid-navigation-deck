//
//  HBDDeckViewController.m
//  Navigation
//
//  Created by 李生 on 2019/9/26.
//  Copyright © 2019 Listen. All rights reserved.
//

#import "HBDDeckViewController.h"
#import "HBDDeckView.h"

@interface HBDDeckViewController ()

@end

@implementation HBDDeckViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    HBDDeckView *deckView = [[HBDDeckView alloc] init];
    deckView.bottomView = self.bottomViewController.view;
    deckView.topView = self.topViewController.view;
    self.view = deckView;
    
    [self addChildViewController:self.bottomViewController];
    self.bottomViewController.view.frame = self.view.bounds;
    [self.view addSubview:self.bottomViewController.view];
    [self.bottomViewController didMoveToParentViewController:self];
    
    [self addChildViewController:self.topViewController];
    self.topViewController.view.frame = self.view.bounds;
    [self.view addSubview:self.topViewController.view];
    [self.topViewController didMoveToParentViewController:self];
    
    self.topViewController.definesPresentationContext = YES;
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    self.bottomViewController.view.frame = self.view.bounds;
    self.topViewController.view.frame = self.view.bounds;
}

- (UINavigationController *)navigationController {
    if ([self.topViewController isKindOfClass:[UINavigationController class]]) {
        return (UINavigationController *)self.topViewController;
    }
    return nil;
}

- (UIViewController *)childViewControllerForStatusBarStyle {
    return self.topViewController;
}

@end
