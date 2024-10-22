import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';

var uid = function() {
    return Math.random()
        .toString(36)
        .substring(2);
};

var ContentLoader = {
    name: 'ContentLoader',
    functional: true,
    props: {
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 130,
        },
        speed: {
            type: Number,
            default: 2,
        },
        preserveAspectRatio: {
            type: String,
            default: 'xMidYMid meet',
        },
        primaryColor: {
            type: String,
            default: '#f9f9f9',
        },
        secondaryColor: {
            type: String,
            default: '#ecebeb',
        },
        uniqueKey: {
            type: String,
        },
        animate: {
            type: Boolean,
            default: false,
        },
    },
    render: function render(h, _ref) {
        var props = _ref.props;
        var data = _ref.data;
        var children = _ref.children;
        var idClip = props.uniqueKey ? props.uniqueKey + '-idClip' : uid();
        var idGradient = props.uniqueKey ? props.uniqueKey + '-idGradient' : uid();
        return h(
            'svg',
            _mergeJSXProps([
                data,
                {
                    attrs: {
                        viewBox: '0 0 ' + props.width + ' ' + props.height,
                        version: '1.1',
                        preserveAspectRatio: props.preserveAspectRatio,
                    },
                },
            ]),
            [
                h('rect', {
                    style: {
                        fill: 'url(#' + idGradient + ')',
                    },
                    attrs: {
                        'clip-path': 'url(#' + idClip + ')',
                        x: '0',
                        y: '0',
                        width: props.width,
                        height: props.height,
                    },
                }),
                h('defs', [
                    h(
                        'clipPath',
                        {
                            attrs: {
                                id: idClip,
                            },
                        },
                        [
                            children ||
                                h('rect', {
                                    attrs: {
                                        x: '0',
                                        y: '0',
                                        rx: '5',
                                        ry: '5',
                                        width: props.width,
                                        height: props.height,
                                    },
                                }),
                        ]
                    ),
                    h(
                        'linearGradient',
                        {
                            attrs: {
                                id: idGradient,
                            },
                        },
                        [
                            h(
                                'stop',
                                {
                                    attrs: {
                                        offset: '0%',
                                        'stop-color': props.primaryColor,
                                    },
                                },
                                [
                                    props.animate
                                        ? h('animate', {
                                              attrs: {
                                                  attributeName: 'offset',
                                                  values: '-2; 1',
                                                  dur: props.speed + 's',
                                                  repeatCount: 'indefinite',
                                              },
                                          })
                                        : null,
                                ]
                            ),
                            h(
                                'stop',
                                {
                                    attrs: {
                                        offset: '50%',
                                        'stop-color': props.secondaryColor,
                                    },
                                },
                                [
                                    props.animate
                                        ? h('animate', {
                                              attrs: {
                                                  attributeName: 'offset',
                                                  values: '-1.5; 1.5',
                                                  dur: props.speed + 's',
                                                  repeatCount: 'indefinite',
                                              },
                                          })
                                        : null,
                                ]
                            ),
                            h(
                                'stop',
                                {
                                    attrs: {
                                        offset: '100%',
                                        'stop-color': props.primaryColor,
                                    },
                                },
                                [
                                    props.animate
                                        ? h('animate', {
                                              attrs: {
                                                  attributeName: 'offset',
                                                  values: '-1; 2',
                                                  dur: props.speed + 's',
                                                  repeatCount: 'indefinite',
                                              },
                                          })
                                        : null,
                                ]
                            ),
                        ]
                    ),
                ]),
            ]
        );
    },
};

var BulletListLoader = {
    name: 'BulletListLoader',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data;
        return h(ContentLoader, data, [
            h('circle', {
                attrs: {
                    cx: '10',
                    cy: '20',
                    r: '8',
                },
            }),
            h('rect', {
                attrs: {
                    x: '25',
                    y: '15',
                    rx: '5',
                    ry: '5',
                    width: '220',
                    height: '10',
                },
            }),
            h('circle', {
                attrs: {
                    cx: '10',
                    cy: '50',
                    r: '8',
                },
            }),
            h('rect', {
                attrs: {
                    x: '25',
                    y: '45',
                    rx: '5',
                    ry: '5',
                    width: '220',
                    height: '10',
                },
            }),
            h('circle', {
                attrs: {
                    cx: '10',
                    cy: '80',
                    r: '8',
                },
            }),
            h('rect', {
                attrs: {
                    x: '25',
                    y: '75',
                    rx: '5',
                    ry: '5',
                    width: '220',
                    height: '10',
                },
            }),
            h('circle', {
                attrs: {
                    cx: '10',
                    cy: '110',
                    r: '8',
                },
            }),
            h('rect', {
                attrs: {
                    x: '25',
                    y: '105',
                    rx: '5',
                    ry: '5',
                    width: '220',
                    height: '10',
                },
            }),
        ]);
    },
};

var CodeLoader = {
    name: 'CodeLoader',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data;
        return h(ContentLoader, data, [
            h('rect', {
                attrs: {
                    x: '0',
                    y: '0',
                    rx: '3',
                    ry: '3',
                    width: '70',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '80',
                    y: '0',
                    rx: '3',
                    ry: '3',
                    width: '100',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '190',
                    y: '0',
                    rx: '3',
                    ry: '3',
                    width: '10',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '15',
                    y: '20',
                    rx: '3',
                    ry: '3',
                    width: '130',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '155',
                    y: '20',
                    rx: '3',
                    ry: '3',
                    width: '130',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '15',
                    y: '40',
                    rx: '3',
                    ry: '3',
                    width: '90',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '115',
                    y: '40',
                    rx: '3',
                    ry: '3',
                    width: '60',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '185',
                    y: '40',
                    rx: '3',
                    ry: '3',
                    width: '60',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '0',
                    y: '60',
                    rx: '3',
                    ry: '3',
                    width: '30',
                    height: '10',
                },
            }),
        ]);
    },
};

var FacebookLoader = {
    name: 'FacebookLoader',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data;
        return h(ContentLoader, data, [
            h('rect', {
                attrs: {
                    x: '70',
                    y: '15',
                    rx: '4',
                    ry: '4',
                    width: '117',
                    height: '6.4',
                },
            }),
            h('rect', {
                attrs: {
                    x: '70',
                    y: '35',
                    rx: '3',
                    ry: '3',
                    width: '85',
                    height: '6.4',
                },
            }),
            h('rect', {
                attrs: {
                    x: '0',
                    y: '80',
                    rx: '3',
                    ry: '3',
                    width: '350',
                    height: '6.4',
                },
            }),
            h('rect', {
                attrs: {
                    x: '0',
                    y: '100',
                    rx: '3',
                    ry: '3',
                    width: '380',
                    height: '6.4',
                },
            }),
            h('rect', {
                attrs: {
                    x: '0',
                    y: '120',
                    rx: '3',
                    ry: '3',
                    width: '201',
                    height: '6.4',
                },
            }),
            h('circle', {
                attrs: {
                    cx: '30',
                    cy: '30',
                    r: '30',
                },
            }),
        ]);
    },
};

var ListLoader = {
    name: 'ListLoader',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data;
        return h(ContentLoader, data, [
            h('rect', {
                attrs: {
                    x: '0',
                    y: '0',
                    rx: '3',
                    ry: '3',
                    width: '250',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '20',
                    y: '20',
                    rx: '3',
                    ry: '3',
                    width: '220',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '20',
                    y: '40',
                    rx: '3',
                    ry: '3',
                    width: '170',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '0',
                    y: '60',
                    rx: '3',
                    ry: '3',
                    width: '250',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '20',
                    y: '80',
                    rx: '3',
                    ry: '3',
                    width: '200',
                    height: '10',
                },
            }),
            h('rect', {
                attrs: {
                    x: '20',
                    y: '100',
                    rx: '3',
                    ry: '3',
                    width: '80',
                    height: '10',
                },
            }),
        ]);
    },
};

var InstagramLoader = {
    name: 'InstagramLoader',
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data;
        return h(
            ContentLoader,
            _mergeJSXProps([
                data,
                {
                    attrs: {
                        height: 480,
                    },
                },
            ]),
            [
                h('circle', {
                    attrs: {
                        cx: '30',
                        cy: '30',
                        r: '30',
                    },
                }),
                h('rect', {
                    attrs: {
                        x: '75',
                        y: '13',
                        rx: '4',
                        ry: '4',
                        width: '100',
                        height: '13',
                    },
                }),
                h('rect', {
                    attrs: {
                        x: '75',
                        y: '37',
                        rx: '4',
                        ry: '4',
                        width: '50',
                        height: '8',
                    },
                }),
                h('rect', {
                    attrs: {
                        x: '0',
                        y: '70',
                        rx: '5',
                        ry: '5',
                        width: '400',
                        height: '400',
                    },
                }),
            ]
        );
    },
};

export { ContentLoader, BulletListLoader, CodeLoader, FacebookLoader, ListLoader, InstagramLoader };
