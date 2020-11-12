//
//  HBDDeckView.m
//  Navigation
//
//  Created by 李生 on 2019/9/26.
//  Copyright © 2019 Listen. All rights reserved.
//

#import "HBDDeckView.h"

@implementation HBDDeckView

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
    Class filterCls = NSClassFromString(@"UIViewControllerWrapperView");
    UIView *hitView = [super hitTest:point withEvent:event];
    if (hitView && ![hitView isKindOfClass:filterCls]) {
        return hitView;
    }
    
    for (UIView *view in self.topView.subviews.reverseObjectEnumerator) {
        CGPoint p = [self convertPoint:point toView:view];
        if ([view pointInside:p withEvent:event]) {
            UIView *responseView = [view hitTest:p withEvent:event];
            if (responseView && ![responseView isKindOfClass:filterCls]) {
                hitView = responseView;
                break;
            }
        }
    }
    
    if (hitView && ![hitView isKindOfClass:filterCls]) {
        return hitView;
    }
    return [self.bottomView hitTest:point withEvent:event];
}

@end
