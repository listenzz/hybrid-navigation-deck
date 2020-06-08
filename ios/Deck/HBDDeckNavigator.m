//
//  HBDDeckNavigator.m
//  Navigation
//
//  Created by 李生 on 2019/9/26.
//  Copyright © 2019 Listen. All rights reserved.
//

#import "HBDDeckNavigator.h"
#import "HBDDeckViewController.h"

@implementation HBDDeckNavigator

- (NSString *)name {
    return @"deck";
}

- (NSArray<NSString *> *)supportActions {
    return @[];
}

- (UIViewController *)createViewControllerWithLayout:(NSDictionary *)layout {
    NSDictionary *deck = [layout objectForKey:self.name];
    NSArray *children = [deck objectForKey:@"children"];
    if (children && children.count == 2) {
        NSDictionary *bottom = [children objectAtIndex:0];
        NSDictionary *top = [children objectAtIndex:1];
        
        UIViewController *bottomVC = [[HBDReactBridgeManager get] controllerWithLayout:bottom];
        UIViewController *topVC = [[HBDReactBridgeManager get] controllerWithLayout:top];
        
        if (bottomVC && topVC) {
            HBDDeckViewController *deckVC = [[HBDDeckViewController alloc] init];
            deckVC.bottomViewController = bottomVC;
            deckVC.topViewController = topVC;
            return deckVC;
        }
    }
    return nil;
}

- (BOOL)buildRouteGraphWithController:(UIViewController *)vc root:(NSMutableArray *)root {
    if ([vc isKindOfClass:[HBDDeckViewController class]]) {
        HBDDeckViewController *deckViewController = (HBDDeckViewController *)vc;
        NSMutableArray *children = [[NSMutableArray alloc] init];
        [[HBDReactBridgeManager get] buildRouteGraphWithController:deckViewController.bottomViewController root:children];
        [[HBDReactBridgeManager get] buildRouteGraphWithController:deckViewController.topViewController root:children];
        
        UIViewController *presented = deckViewController.topViewController.presentedViewController;
        while (presented && !presented.isBeingDismissed ) {
             [[HBDReactBridgeManager get] buildRouteGraphWithController:presented root:children];
            presented = presented.presentedViewController;
        }
        
        [root addObject:@{ @"layout": self.name,
                           @"sceneId": vc.sceneId,
                           @"children": children,
                           @"mode": [vc hbd_mode],
                           }];
        return YES;
    }
    return NO;
}

- (HBDViewController *)primaryViewControllerWithViewController:(UIViewController *)vc {
    if ([vc isKindOfClass:[HBDDeckViewController class]]) {
        HBDDeckViewController *deckVC = (HBDDeckViewController *)vc;
        UIViewController *presentedVC = deckVC.topViewController;
        while (true) {
            if (presentedVC.presentedViewController && !presentedVC.presentedViewController.isBeingDismissed) {
               presentedVC = presentedVC.presentedViewController;
            } else {
                return [[HBDReactBridgeManager sharedInstance] primaryViewControllerWithViewController:presentedVC];
            }
        }
    }
    return nil;
}


- (void)handleNavigationWithViewController:(UIViewController *)target action:(NSString *)action extras:(NSDictionary *)extras resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    resolve(@(NO));
}

@end
