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

- (NSDictionary *)buildRouteGraphWithViewController:(UIViewController *)vc {
    if ([vc isKindOfClass:[HBDDeckViewController class]]) {
        HBDDeckViewController *deck = (HBDDeckViewController *)vc;
        NSMutableArray *children = [[NSMutableArray alloc] init];
        
        NSDictionary *bottom = [[HBDReactBridgeManager get] buildRouteGraphWithViewController:deck.bottomViewController];
        [children addObject:bottom];
        
        NSDictionary *top = [[HBDReactBridgeManager get] buildRouteGraphWithViewController:deck.topViewController];
        [children addObject:top];
        
        [children addObjectsFromArray:[self presentedGraphsWithRootViewController:deck.topViewController]];
        
        return @{
            @"layout": self.name,
            @"sceneId": vc.sceneId,
            @"children": children,
            @"mode": [vc hbd_mode],
        };
    }
    return nil;
}

- (NSArray *)presentedGraphsWithRootViewController:(UIViewController *)vc {
    NSMutableArray *graphs = [[NSMutableArray alloc] init];
    UIViewController *presented = vc.presentedViewController;
    while (presented && !presented.beingDismissed && ![presented isKindOfClass:[UIAlertController class]]) {
        NSDictionary *graph = [[HBDReactBridgeManager get] buildRouteGraphWithViewController:presented];
        if (graph) {
            [graphs addObject:graph];
        }
        presented = presented.presentedViewController;
    }
    
    return graphs;
}

- (HBDViewController *)primaryViewControllerWithViewController:(UIViewController *)vc {
    if ([vc isKindOfClass:[HBDDeckViewController class]]) {
        HBDDeckViewController *deck = (HBDDeckViewController *)vc;
        return [[HBDReactBridgeManager get] primaryViewControllerWithViewController:deck.topViewController];
    }
    return nil;
}

- (void)handleNavigationWithViewController:(UIViewController *)target action:(NSString *)action extras:(NSDictionary *)extras resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    resolve(@(NO));
}

@end
