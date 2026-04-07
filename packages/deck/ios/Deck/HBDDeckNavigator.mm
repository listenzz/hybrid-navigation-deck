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

- (UIViewController *)viewControllerWithLayout:(NSDictionary *)layout {
    NSDictionary *model = [layout objectForKey:self.name];
    NSArray *children = [model objectForKey:@"children"];
    if (children.count != 2) {
        return nil;
    }

    UIViewController *bottom = [[HBDReactBridgeManager get] viewControllerWithLayout:[children objectAtIndex:0]];
    UIViewController *top = [[HBDReactBridgeManager get] viewControllerWithLayout:[children objectAtIndex:1]];
    
    if (bottom && top) {
        HBDDeckViewController *deck = [[HBDDeckViewController alloc] init];
        deck.bottomViewController = bottom;
        deck.topViewController = top;
        return deck;
    }
    
    return nil;
}

- (NSDictionary *)routeGraphWithViewController:(UIViewController *)vc {
    if (![vc isKindOfClass:[HBDDeckViewController class]]) {
        return nil;
    }
    
    HBDDeckViewController *deck = (HBDDeckViewController *)vc;
    NSMutableArray *children = [[NSMutableArray alloc] init];
    NSDictionary *bottom = [[HBDReactBridgeManager get] routeGraphWithViewController:deck.bottomViewController];
    [children addObject:bottom];
    NSDictionary *top = [[HBDReactBridgeManager get] routeGraphWithViewController:deck.topViewController];
    [children addObject:top];
    [children addObjectsFromArray:[self presentedGraphsWithRootViewController:deck.topViewController]];
    
    return @{
        @"layout": self.name,
        @"sceneId": deck.sceneId,
        @"children": children,
        @"mode": [deck hbd_mode],
    };
}

- (NSArray *)presentedGraphsWithRootViewController:(UIViewController *)vc {
    NSMutableArray *graphs = [[NSMutableArray alloc] init];
    UIViewController *presented = vc.presentedViewController;
    while (presented && !presented.beingDismissed && ![presented isKindOfClass:[UIAlertController class]]) {
        NSDictionary *graph = [[HBDReactBridgeManager get] routeGraphWithViewController:presented];
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

- (void)handleNavigationWithViewController:(UIViewController *)vc action:(NSString *)action extras:(NSDictionary *)extras callback:(RCTResponseSenderBlock)callback {
    callback(@[NSNull.null, @NO]);
}

- (void)invalidate {
    
}


@end
