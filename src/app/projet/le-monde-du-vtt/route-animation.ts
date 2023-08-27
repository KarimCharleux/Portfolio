import { animate, group, query, style, transition, trigger } from '@angular/animations';

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


function fade() {
  return [
    query(':enter, :leave', [
        style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }
        ),
      ],
      { optional: true }
    ),
    query(':enter', [
        animate('600ms ease',
          style({
              opacity: 1,
              transform: 'scale(1) translateY(0)'
            }
          ),
        ),
      ],
      { optional: true }
    )
  ];
}

function slideTo(direction: any) {
  const optional = { optional: true };
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
        style({ [direction]: '-100%' })
      ],
      optional
    ),
    group([
      query(':leave', [
          animate('600ms ease',
            style({ [direction]: '100%' }))
        ],
        optional
      ),
      query(':enter', [
          animate('600ms ease',
            style({ [direction]: '0%' }))
        ],
        optional
      )
    ]),
  ];
}
