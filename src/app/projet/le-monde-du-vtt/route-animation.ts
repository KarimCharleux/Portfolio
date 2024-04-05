import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('* => isHome', slideTo('left')),
    transition('* => isContact', slideTo('right')),
    transition('isHome => *', slideTo('right')),
    transition('isContact => *', slideTo('left')),
    transition('isFirst => isSecond', slideTo('right')),
    transition('isFirst => isThird', slideTo('right')),
    transition('isSecond => isFirst', slideTo('left')),
    transition('isSecond => isThird', slideTo('right')),
    transition('isThird => isFirst', slideTo('left')),
    transition('isThird => isSecond', slideTo('left'))
  ]);

function slideTo(direction: any) {
  const optional = {optional: true};
  return [
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            [direction]: 0,
            width: '100%'
          }
        ),
      ],
      optional
    ),
    query(':enter', [
        style({[direction]: '-100%'})
      ],
      optional
    ),
    group([
      query(':leave', [
          animate('600ms ease',
            style({[direction]: '100%'}))
        ],
        optional
      ),
      query(':enter', [
          animate('600ms ease',
            style({[direction]: '0%'}))
        ],
        optional
      )
    ]),
  ];
}
