/* jshint ignore:start */

/* jshint ignore:end */

define('ember-intl-example/adapters/-intl-adapter', ['exports', 'ember', 'ember-intl/models/intl-get-result', 'ember-intl/models/locale', 'ember-intl/adapter'], function (exports, Ember, IntlGetResult, Locale, IntlAdapter) {

    'use strict';

    function normalize(fullName) {
        Ember['default'].assert('Lookup name must be a string', typeof fullName === 'string');

        return fullName.toLowerCase();
    }

    exports['default'] = IntlAdapter['default'].extend({
        findLanguage: function findLanguage(locale) {
            if (locale instanceof Locale['default']) {
                return locale;
            }

            if (typeof locale === 'string') {
                return this.container.lookup('locale:' + normalize(locale));
            }
        },

        findTranslation: function findTranslation(locales, translationKey) {
            var container = this.container;
            var locale, translation, key;

            for (var i = 0, len = locales.length; i < len; i++) {
                key = locales[i];
                locale = this.findLanguage(key);

                if (locale) {
                    translation = locale.getValue(translationKey);

                    if (typeof translation !== 'undefined') {
                        return new IntlGetResult['default'](translation, key);
                    }
                }
            }
        }
    });

});
define('ember-intl-example/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-intl-example/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-intl-example/components/code-snippet', ['exports', 'ember', 'ember-intl-example/snippets'], function (exports, Ember, Snippets) {

  'use strict';

  var Highlight = require("highlight.js");

  exports['default'] = Ember['default'].Component.extend({
    tagName: "pre",
    classNameBindings: ["language"],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get("unindent")) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n");
      for (var i = 0; i < lines.length; i++) {
        match = /^\s*/.exec(lines[i]);
        if (match && (typeof min === "undefined" || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== "undefined" && min > 0) {
        src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", "g"), "$1");
      }
      return src;
    },

    source: Ember['default'].computed("name", function () {
      return this._unindent((Snippets['default'][this.get("name")] || "").replace(/^(\s*\n)*/, "").replace(/\s*$/, ""));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get("element"));
    },

    language: Ember['default'].computed("name", function () {
      var m = /\.(\w+)$/i.exec(this.get("name"));
      if (m) {
        switch (m[1].toLowerCase()) {
          case "js":
            return "javascript";
          case "hbs":
            return "handlebars";
          case "css":
            return "css";
          case "scss":
            return "scss";
        }
      }
    })
  });

});
define('ember-intl-example/components/x-product', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
		classNames: 'x-product'
	});

});
define('ember-intl-example/components/x-select', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    // app/components/my-select.js
    var get = Ember['default'].get;

    exports['default'] = Ember['default'].Component.extend({
        options: [],
        value: null,

        actions: {
            change: function change() {
                var changeAction = get(this, 'action');
                var selectedEl = this.$('select')[0];
                var selectedIndex = selectedEl.selectedIndex;
                var options = get(this, 'options');
                var value = options[selectedIndex];

                this.set('value', value);

                if (typeof changeAction === 'function') {
                    changeAction(value);
                }
            }
        }
    });

});
define('ember-intl-example/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var now = new Date();
	var yesterday = now.setDate(now.getDate() - 1);
	var threeDaysAgo = now.setDate(now.getDate() - 2);

	exports['default'] = Ember['default'].Controller.extend({
		intl: Ember['default'].inject.service(),
		locales: Ember['default'].A(['en-us', 'en-gb', 'fr-fr']),
		actions: {
			changeLocale: function changeLocale(localeName) {
				this.set('intl.locale', localeName);
			}
		},
		num: 0,
		now: now,
		yesterday: yesterday,
		threeDaysAgo: threeDaysAgo,
		incrementTime: Ember['default'].on('init', function () {
			var _this = this;

			setInterval(function () {
				Ember['default'].run(function () {
					_this.set('now', new Date());
					_this.incrementProperty('num');
				});
			}, 500);
		})
	});

});
define('ember-intl-example/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-intl-example/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-intl-example/formats', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    date: {
      'time-style': {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    number: {
      EUR: { style: 'currency', currency: 'EUR' },
      USD: { style: 'currency', currency: 'USD' }
    },
    time: {
      hhmmss: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    }
  };

});
define('ember-intl-example/formatters/format-date', ['exports', 'ember', 'ember-intl/formatter-base'], function (exports, Ember, Formatter) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var FormatDate = Formatter['default'].extend({
        format: function format(value, hash) {
            var args = this.buildOptions(value, hash);
            var intl = this.intl;

            return intl.formatDate.apply(intl, args);
        }
    });

    FormatDate.reopenClass({
        formatOptions: Ember['default'].A(['localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'])
    });

    exports['default'] = FormatDate;

});
define('ember-intl-example/formatters/format-html-message', ['exports', 'ember', 'ember-intl-example/formatters/format-message', 'ember-intl/models/intl-get-result'], function (exports, Ember, FormatterMessage, IntlGetResult) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var FormatHtmlMessage = FormatterMessage['default'].extend({
        escapeProps: function escapeProps(hash) {
            var value;

            return Object.keys(hash).reduce(function (result, hashKey) {
                value = hash[hashKey];

                if (typeof value === 'string') {
                    value = Ember['default'].Handlebars.Utils.escapeExpression(value);
                }

                result[hashKey] = value;
                return result;
            }, {});
        },

        format: function format(value, hash) {
            var locales = hash.locales;
            hash = this.escapeProps(hash);
            var superResult = this._super(value, hash, locales);
            return Ember['default'].String.htmlSafe(superResult);
        }
    });

    exports['default'] = FormatHtmlMessage;

});
define('ember-intl-example/formatters/format-message', ['exports', 'ember', 'ember-intl/formatter-base', 'ember-intl/models/intl-get-result'], function (exports, Ember, Formatter, IntlGetResult) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var validKey = /[\w|.]/;

    var FormatMessage = Formatter['default'].extend({
        format: function format(value, hash, optionalLocale) {
            var locales = optionalLocale || hash.locales;
            var formatOptions = {};

            if (value instanceof IntlGetResult['default']) {
                if (typeof locales === 'undefined') {
                    locales = value.locale;
                }

                value = value.translation;
            }

            if (locales) {
                formatOptions.locales = locales;
            }

            return this.intl.formatMessage(value, hash, formatOptions);
        }
    });

    FormatMessage.reopenClass({
        formatOptions: Ember['default'].A()
    });

    exports['default'] = FormatMessage;

});
define('ember-intl-example/formatters/format-number', ['exports', 'ember', 'ember-intl/formatter-base'], function (exports, Ember, Formatter) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var FormatNumber = Formatter['default'].extend({
        format: function format(value, hash) {
            var args = this.buildOptions(value, hash);
            var intl = this.intl;

            return intl.formatNumber.apply(intl, args);
        }
    });

    FormatNumber.reopenClass({
        formatOptions: Ember['default'].A(['localeMatcher', 'style', 'currency', 'currencyDisplay', 'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits'])
    });

    exports['default'] = FormatNumber;

});
define('ember-intl-example/formatters/format-relative', ['exports', 'ember', 'ember-intl/formatter-base'], function (exports, Ember, Formatter) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var FormatRelative = Formatter['default'].extend({
        format: function format(value, hash) {
            var args = this.buildOptions(value, hash);
            var intl = this.intl;

            return intl.formatRelative.apply(intl, args);
        }
    });

    FormatRelative.reopenClass({
        formatOptions: Ember['default'].A(['style', 'units'])
    });

    exports['default'] = FormatRelative;

});
define('ember-intl-example/formatters/format-time', ['exports', 'ember', 'ember-intl/formatter-base'], function (exports, Ember, Formatter) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var FormatTime = Formatter['default'].extend({
        format: function format(value, hash) {
            var args = this.buildOptions(value, hash);
            var intl = this.intl;

            return intl.formatTime.apply(intl, args);
        }
    });

    FormatTime.reopenClass({
        formatOptions: Ember['default'].A(['localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'])
    });

    exports['default'] = FormatTime;

});
define('ember-intl-example/helpers/format-date', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-date');

});
define('ember-intl-example/helpers/format-html-message', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-html-message');

});
define('ember-intl-example/helpers/format-message', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-message');

});
define('ember-intl-example/helpers/format-number', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-number');

});
define('ember-intl-example/helpers/format-relative', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-relative');

});
define('ember-intl-example/helpers/format-time', ['exports', 'ember-intl/helpers/base'], function (exports, FormatHelper) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = FormatHelper['default']('format-time');

});
define('ember-intl-example/helpers/intl-get', ['exports', 'ember', 'ember-intl/utils/streams'], function (exports, Ember, streams) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    exports['default'] = function (value, options) {
        Ember['default'].assert('intl-get helper must be used as a subexpression', options.isInline === true);

        var view = options.data.view;
        var types = options.types;
        var hash = streams.readHash(options.hash);
        var intl = view.container.lookup('service:intl');

        var currentValue = value;
        var outStreamValue = '';
        var valueStream;

        var outStream = new streams.Stream(function () {
            return outStreamValue;
        });

        outStream.setValue = function (_value) {
            outStreamValue = _value;
            this.notify();
        };

        function valueStreamChanged() {
            currentValue = valueStream.value();
            pokeStream();
        }

        function pokeStream() {
            return intl.getTranslation(streams.read(currentValue), hash.locales).then(function (translation) {
                outStream.setValue(translation);
            });
        }

        if (types[0] === 'ID') {
            valueStream = view.getStream(value);
            currentValue = valueStream.value();
            valueStream.subscribe(valueStreamChanged);
        }

        intl.on('localesChanged', this, pokeStream);

        view.one('willDestroyElement', this, function () {
            intl.off('localesChanged', this, pokeStream);

            if (valueStream) {
                valueStream.unsubscribe(valueStreamChanged);
            }

            streams.destroyStream(outStream);
        });

        pokeStream();

        return outStream;
    };

});
define('ember-intl-example/helpers/is-equal', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    // is-equal helper is necessary to determine which option is currently selected.
    // app/helpers/is-equal.js
    exports['default'] = Ember['default'].Helper.helper(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var leftSide = _ref2[0];
        var rightSide = _ref2[1];

        return leftSide === rightSide;
    });

});
define('ember-intl-example/initializers/app-version', ['exports', 'ember-intl-example/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-intl-example/initializers/ember-intl', ['exports', 'ember', 'ember-intl-example/config/environment', 'ember-intl-example/services/intl', 'ember-intl/utils/data', 'ember-intl-example/helpers/format-date', 'ember-intl-example/helpers/format-time', 'ember-intl-example/helpers/format-relative', 'ember-intl-example/helpers/format-number', 'ember-intl-example/helpers/format-html-message', 'ember-intl-example/helpers/format-message'], function (exports, Ember, ENV, IntlService, data, FormatDate, FormatTime, FormatRelative, FormatNumber, FormatHtmlMessage, FormatMessage) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var registerIntl = function registerIntl(container) {
        var seen = requirejs._eak_seen;
        var prefix = ENV['default'].modulePrefix;

        container.optionsForType('formats', {
            singleton: true,
            instantiate: false
        });

        container.optionsForType('locale', {
            singleton: true,
            instantiate: true
        });

        Object.keys(seen).filter(function (key) {
            return key.indexOf(prefix + '/cldrs/') === 0;
        }).forEach(function (key) {
            data.addLocaleData(require(key, null, null, true)['default']);
        });

        if (Ember['default'].HTMLBars) {
            Ember['default'].HTMLBars._registerHelper('format-date', FormatDate['default']);
            Ember['default'].HTMLBars._registerHelper('format-time', FormatTime['default']);
            Ember['default'].HTMLBars._registerHelper('format-relative', FormatRelative['default']);
            Ember['default'].HTMLBars._registerHelper('format-number', FormatNumber['default']);
            Ember['default'].HTMLBars._registerHelper('format-html-message', FormatHtmlMessage['default']);
            Ember['default'].HTMLBars._registerHelper('format-message', FormatMessage['default']);
        }

        // only here for backwards compat.
        container.register('intl:main', container.lookup('service:intl'), {
            instantiate: false,
            singleton: true
        });

        container.typeInjection('controller', 'intl', 'service:intl');
        container.typeInjection('component', 'intl', 'service:intl');
        container.typeInjection('route', 'intl', 'service:intl');
        container.typeInjection('model', 'intl', 'service:intl');
        container.typeInjection('view', 'intl', 'service:intl');
        container.typeInjection('formatter', 'intl', 'service:intl');
    };

    exports['default'] = {
        name: 'ember-intl',

        initialize: function initialize(container, app) {
            registerIntl(container);
            app.intl = container.lookup('service:intl');
        }
    };

    exports.registerIntl = registerIntl;

});
define('ember-intl-example/initializers/export-application-global', ['exports', 'ember', 'ember-intl-example/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-intl-example/router', ['exports', 'ember', 'ember-intl-example/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('ember-intl-example/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		intl: Ember['default'].inject.service(),
		setTitle: Ember['default'].observer('intl.locale', function () {
			var intl = this.get('intl');
			var title = intl.findTranslationByKey('product.title');
			document.title = intl.formatMessage(title);
		}),
		beforeModel: function beforeModel() {
			this.set('intl.locale', 'en-us');
			this.setTitle();
		},
		model: function model() {
			var _this = this;

			return [{
				name: 'iphone',
				price: 500,
				imageUrl: '/iphone.png'
			}, {
				name: 'xbox',
				price: 350,
				imageUrl: '/xbox.png'
			}, {
				name: 'playstation',
				price: 400,
				imageUrl: '/playstation.png'
			}, {
				name: 'gameboy',
				price: 50,
				imageUrl: '/gameboy.png'
			}].map(function (product) {
				product.deadline = _this.randomDate();
				return product;
			});
		},
		randomDate: function randomDate() {
			var date = new Date();
			date.setDate(date.getDate() + Math.ceil(Math.random(0, 10) * 100));
			return date;
		}
	});

});
define('ember-intl-example/services/intl', ['exports', 'ember', 'ember-intl/utils/data', 'ember-intl/format-cache/memoizer', 'ember-intl/models/intl-get-result'], function (exports, Ember, data, createFormatCache, IntlGetResult) {

    'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */

    var ServiceKlass = Ember['default'].Service || Ember['default'].Controller;
    var makeArray = Ember['default'].makeArray;
    var get = Ember['default'].get;
    var on = Ember['default'].on;
    var computed = Ember['default'].computed;
    var observer = Ember['default'].observer;
    var isEmpty = Ember['default'].isEmpty;
    var isPresent = Ember['default'].isPresent;
    var runOnce = Ember['default'].run.once;

    function assertIsDate(date, errMsg) {
        Ember['default'].assert(errMsg, isFinite(date));
    }

    exports['default'] = ServiceKlass.extend(Ember['default'].Evented, {
        locales: null,
        defaultLocale: null,

        getDateTimeFormat: null,
        getRelativeFormat: null,
        getMessageFormat: null,
        getNumberFormat: null,

        adapterType: '-intl-adapter',

        setupMemoizers: on('init', function () {
            this.setProperties({
                getDateTimeFormat: createFormatCache['default'](Intl.DateTimeFormat),
                getRelativeFormat: createFormatCache['default'](data.IntlRelativeFormat),
                getNumberFormat: createFormatCache['default'](Intl.NumberFormat),
                getMessageFormat: createFormatCache['default'](data.IntlMessageFormat)
            });
        }),

        adapter: computed('adapterType', function () {
            var adapterType = get(this, 'adapterType');
            var app = this.container.lookup('application:main');

            if (app && app.IntlAdapter) {
                return app.IntlAdapter.create({
                    container: this.container
                });
            } else if (typeof adapterType === 'string') {
                return this.container.lookup('adapter:' + adapterType);
            }
        }).readOnly(),

        current: computed('locales', 'defaultLocale', function () {
            var locales = makeArray(get(this, 'locales'));
            var defaultLocale = get(this, 'defaultLocale');

            if (isPresent(defaultLocale) && locales.indexOf(defaultLocale) === -1) {
                locales.push(defaultLocale);
            }

            return locales;
        }).readOnly(),

        formats: computed(function () {
            return this.container.lookup('formats:main', {
                instantiate: false
            }) || {};
        }).readOnly(),

        localeChanged: observer('current', function () {
            runOnce(this, this.notifyLocaleChanged);
        }),

        addMessage: function addMessage(locale, key, value) {
            return this.getLanguage(locale).then(function (localeInstance) {
                return localeInstance.addMessage(key, value);
            });
        },

        addMessages: function addMessages(locale, messageObject) {
            return this.getLanguage(locale).then(function (localeInstance) {
                return localeInstance.addMessages(messageObject);
            });
        },

        notifyLocaleChanged: function notifyLocaleChanged() {
            this.trigger('localesChanged');
        },

        formatMessage: function formatMessage(message, values, options) {
            // When `message` is a function, assume it's an IntlMessageFormat
            // instance's `format()` method passed by reference, and call it. This
            // is possible because its `this` will be pre-bound to the instance.
            if (typeof message === 'function') {
                return message(values);
            }

            options = options || {};

            var locales = makeArray(options.locales);
            var formats = options.formats || get(this, 'formats');

            if (isEmpty(locales)) {
                locales = get(this, 'current');
            }

            if (typeof message === 'string') {
                message = this.getMessageFormat(message, locales, formats);
            }

            return message.format(values);
        },

        formatTime: function formatTime(date, formatOptions, options) {
            date = new Date(date);
            assertIsDate(date, 'A date or timestamp must be provided to formatTime()');

            return this._format('time', date, formatOptions, options);
        },

        formatRelative: function formatRelative(date, formatOptions, options) {
            date = new Date(date);
            assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');

            return this._format('relative', date, formatOptions, options);
        },

        formatDate: function formatDate(date, formatOptions, options) {
            date = new Date(date);
            assertIsDate(date, 'A date or timestamp must be provided to formatDate()');

            return this._format('date', date, formatOptions, options);
        },

        formatNumber: function formatNumber(num, formatOptions, options) {
            return this._format('number', num, formatOptions, options);
        },

        _format: function _format(type, value, formatOptions, helperOptions) {
            if (!helperOptions) {
                helperOptions = formatOptions || {};
                formatOptions = null;
            }

            var locales = makeArray(helperOptions.locales);
            var formats = get(this, 'formats');

            if (isEmpty(locales)) {
                locales = get(this, 'current');
            }

            if (formatOptions) {
                if (typeof formatOptions === 'string' && formats) {
                    formatOptions = get(formats, type + '.' + formatOptions);
                }

                formatOptions = Ember['default'].$.extend({}, formatOptions, helperOptions);
            } else {
                formatOptions = helperOptions;
            }

            switch (type) {
                case 'date':
                case 'time':
                    return this.getDateTimeFormat(locales, formatOptions).format(value);
                case 'number':
                    return this.getNumberFormat(locales, formatOptions).format(value);
                case 'relative':
                    return this.getRelativeFormat(locales, formatOptions).format(value);
                default:
                    throw new Error('Unrecognized simple format type: ' + type);
            }
        },

        getLanguage: function getLanguage(locale) {
            var result = this.get('adapter').findLanguage(locale);

            return Ember['default'].RSVP.cast(result).then(function (localeInstance) {
                if (typeof localeInstance === 'undefined') {
                    throw new Error('`locale` must be a string or a locale instance');
                }

                return localeInstance;
            });
        },

        getTranslation: function getTranslation(key, locales) {
            locales = locales ? Ember['default'].makeArray(locales) : this.get('current');

            var result = this.get('adapter').findTranslation(locales, key);

            return Ember['default'].RSVP.cast(result).then(function (result) {
                Ember['default'].assert('findTranslation should return an object of instance `IntlGetResult`', result instanceof IntlGetResult['default']);

                if (typeof result === 'undefined') {
                    throw new Error('translation: `' + key + '` on locale(s): ' + locales.join(',') + ' was not found.');
                }

                return result;
            });
        }
    });

});
define('ember-intl-example/snippets', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    "format-date.hbs": "{{format-date now}}\n{{format-date yesterday}}\n",
    "format-message.hbs": "{{#each model as |product|}}\n  {{#x-product\n    price=product.price\n    deadline=product.deadline\n    product=product.name}}\n      <h3>{{product.name}}</h3>\n      <img src={{product.imageUrl}} />\n  {{/x-product}}\n{{/each}}\n",
    "format-number.hbs": "{{format-number num}}\n{{format-number num format='EUR'}}\n{{format-number num style='currency' currency='USD'}}\n",
    "format-relative.hbs": "{{format-relative now}}\n{{format-relative yesterday}}\n{{format-relative threeDaysAgo}}\n",
    "format-time.hbs": "{{format-time now format='hhmmss'}}\n{{format-time now hour='numeric' second='numeric' minute='numeric' hour12=false}}\n"
  };

});
define('ember-intl-example/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 1
              },
              "end": {
                "line": 20,
                "column": 1
              }
            },
            "moduleName": "ember-intl-example/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h3");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [3]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            morphs[1] = dom.createAttrMorph(element0, 'src');
            return morphs;
          },
          statements: [
            ["content","product.name",["loc",[null,[18,7],[18,23]]]],
            ["attribute","src",["get","product.imageUrl",["loc",[null,[19,14],[19,30]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 0
            },
            "end": {
              "line": 21,
              "column": 0
            }
          },
          "moduleName": "ember-intl-example/templates/application.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","x-product",[],["price",["subexpr","@mut",[["get","product.price",["loc",[null,[15,8],[15,21]]]]],[],[]],"deadline",["subexpr","@mut",[["get","product.deadline",["loc",[null,[16,11],[16,27]]]]],[],[]],"product",["subexpr","@mut",[["get","product.name",["loc",[null,[17,10],[17,22]]]]],[],[]]],0,null,["loc",[null,[14,1],[20,15]]]]
        ],
        locals: ["product"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 69,
            "column": 0
          }
        },
        "moduleName": "ember-intl-example/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("ember-intl demo");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Locale");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Format Message");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Format Time");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Format Date");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Format Relative");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Format Number");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(18);
        morphs[0] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,8,8,contextualElement);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [10]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [14]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [16]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [18]),1,1);
        morphs[6] = dom.createMorphAt(dom.childAt(fragment, [22]),0,0);
        morphs[7] = dom.createMorphAt(dom.childAt(fragment, [24]),0,0);
        morphs[8] = dom.createMorphAt(dom.childAt(fragment, [26]),1,1);
        morphs[9] = dom.createMorphAt(dom.childAt(fragment, [28]),1,1);
        morphs[10] = dom.createMorphAt(dom.childAt(fragment, [32]),0,0);
        morphs[11] = dom.createMorphAt(dom.childAt(fragment, [34]),0,0);
        morphs[12] = dom.createMorphAt(dom.childAt(fragment, [36]),0,0);
        morphs[13] = dom.createMorphAt(dom.childAt(fragment, [38]),1,1);
        morphs[14] = dom.createMorphAt(dom.childAt(fragment, [42]),0,0);
        morphs[15] = dom.createMorphAt(dom.childAt(fragment, [44]),0,0);
        morphs[16] = dom.createMorphAt(dom.childAt(fragment, [46]),0,0);
        morphs[17] = dom.createMorphAt(dom.childAt(fragment, [48]),1,1);
        return morphs;
      },
      statements: [
        ["inline","x-select",[],["action",["subexpr","action",["changeLocale"],[],["loc",[null,[6,8],[6,31]]]],"options",["subexpr","@mut",[["get","locales",["loc",[null,[7,9],[7,16]]]]],[],[]],"value",["subexpr","@mut",[["get","intl.locale",["loc",[null,[8,7],[8,18]]]]],[],[]]],["loc",[null,[5,0],[9,2]]]],
        ["block","each",[["get","model",["loc",[null,[13,8],[13,13]]]]],[],0,null,["loc",[null,[13,0],[21,9]]]],
        ["inline","code-snippet",[],["name","format-message.hbs"],["loc",[null,[24,1],[24,43]]]],
        ["inline","format-time",[["get","now",["loc",[null,[29,19],[29,22]]]]],["format","hhmmss"],["loc",[null,[29,5],[29,40]]]],
        ["inline","format-time",[["get","now",["loc",[null,[30,19],[30,22]]]]],["hour","numeric","second","numeric","minute","numeric","hour12",false],["loc",[null,[30,5],[30,86]]]],
        ["inline","code-snippet",[],["name","format-time.hbs"],["loc",[null,[33,1],[33,40]]]],
        ["inline","format-date",[["get","now",["loc",[null,[39,19],[39,22]]]]],[],["loc",[null,[39,5],[39,24]]]],
        ["inline","format-date",[["get","yesterday",["loc",[null,[40,19],[40,28]]]]],[],["loc",[null,[40,5],[40,30]]]],
        ["inline","code-snippet",[],["name","format-date.hbs"],["loc",[null,[43,1],[43,40]]]],
        ["inline","code-snippet",[],["name","format-relative.hbs"],["loc",[null,[47,1],[47,44]]]],
        ["inline","format-relative",[["get","now",["loc",[null,[52,23],[52,26]]]]],[],["loc",[null,[52,5],[52,28]]]],
        ["inline","format-relative",[["get","yesterday",["loc",[null,[53,23],[53,32]]]]],[],["loc",[null,[53,5],[53,34]]]],
        ["inline","format-relative",[["get","threeDaysAgo",["loc",[null,[54,23],[54,35]]]]],[],["loc",[null,[54,5],[54,37]]]],
        ["inline","code-snippet",[],["name","format-relative.hbs"],["loc",[null,[57,1],[57,44]]]],
        ["inline","format-number",[["get","num",["loc",[null,[62,21],[62,24]]]]],[],["loc",[null,[62,5],[62,26]]]],
        ["inline","format-number",[["get","num",["loc",[null,[63,21],[63,24]]]]],["format","EUR"],["loc",[null,[63,5],[63,39]]]],
        ["inline","format-number",[["get","num",["loc",[null,[64,21],[64,24]]]]],["style","currency","currency","USD"],["loc",[null,[64,5],[64,58]]]],
        ["inline","code-snippet",[],["name","format-number.hbs"],["loc",[null,[67,1],[67,42]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-intl-example/templates/components/code-snippet', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-intl-example/templates/components/code-snippet.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","source",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-intl-example/templates/components/x-product', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "ember-intl-example/templates/components/x-product.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","toolbar");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]],
        ["inline","format-message",[["subexpr","intl-get",["product.info"],[],["loc",[null,[4,18],[4,43]]]]],["price",["subexpr","@mut",[["get","price",["loc",[null,[4,50],[4,55]]]]],[],[]],"deadline",["subexpr","@mut",[["get","deadline",["loc",[null,[4,65],[4,73]]]]],[],[]]],["loc",[null,[4,1],[4,75]]]],
        ["inline","format-message",[["subexpr","intl-get",["product.buy"],[],["loc",[null,[6,19],[6,43]]]]],[],["loc",[null,[6,2],[6,45]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-intl-example/templates/components/x-select', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 6,
              "column": 4
            }
          },
          "moduleName": "ember-intl-example/templates/components/x-select.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'selected');
          morphs[2] = dom.createMorphAt(element0,1,1);
          return morphs;
        },
        statements: [
          ["attribute","value",["get","item",["loc",[null,[3,24],[3,28]]]]],
          ["attribute","selected",["subexpr","is-equal",[["get","item",["loc",[null,[3,51],[3,55]]]],["get","value",["loc",[null,[3,56],[3,61]]]]],[],["loc",[null,[3,40],[3,63]]]]],
          ["content","item",["loc",[null,[4,12],[4,20]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "ember-intl-example/templates/components/x-select.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("select");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(element1,1,1);
        return morphs;
      },
      statements: [
        ["element","action",["change"],["on","change"],["loc",[null,[1,8],[1,39]]]],
        ["block","each",[["get","options",["loc",[null,[2,12],[2,19]]]]],["key","@index"],0,null,["loc",[null,[2,4],[6,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-intl-example/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/components/x-product.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/x-product.js should pass jshint', function() { 
    ok(true, 'components/x-product.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/components/x-select.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/x-select.js should pass jshint', function() { 
    ok(true, 'components/x-select.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/formats.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('formats.js should pass jshint', function() { 
    ok(true, 'formats.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/helpers/is-equal.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/is-equal.js should pass jshint', function() { 
    ok(true, 'helpers/is-equal.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-intl-example/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-intl-example/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/helpers/start-app', ['exports', 'ember', 'ember-intl-example/app', 'ember-intl-example/router', 'ember-intl-example/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-intl-example/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/integration/x-product-test', ['ember-qunit', 'ember-intl-example/initializers/ember-intl'], function (ember_qunit, initializer) {

	'use strict';


	ember_qunit.moduleForComponent('x-product', 'XProductComponent', {
		integration: true,
		setup: function setup() {
			initializer['default'].initialize(this.container);
			var intl = this.container.lookup('service:intl');
			intl.set('locale', 'en-us');
		}
	});

	ember_qunit.test('it renders', function (assert) {
		assert.expect(1);
		this.render(Ember.HTMLBars.template((function () {
			return {
				meta: {
					'revision': 'Ember@1.13.3',
					'loc': {
						'source': null,
						'start': {
							'line': 1,
							'column': 0
						},
						'end': {
							'line': 1,
							'column': 43
						}
					}
				},
				arity: 0,
				cachedFragment: null,
				hasRendered: false,
				buildFragment: function buildFragment(dom) {
					var el0 = dom.createDocumentFragment();
					var el1 = dom.createComment('');
					dom.appendChild(el0, el1);
					return el0;
				},
				buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
					var morphs = new Array(1);
					morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
					dom.insertBoundary(fragment, 0);
					dom.insertBoundary(fragment, null);
					return morphs;
				},
				statements: [['inline', 'x-product', [], ['price', ['subexpr', '@mut', [['get', 'price', ['loc', [null, [1, 18], [1, 23]]]]], [], []], 'deadline', ['subexpr', '@mut', [['get', 'deadline', ['loc', [null, [1, 33], [1, 41]]]]], [], []]], ['loc', [null, [1, 0], [1, 43]]]]],
				locals: [],
				templates: []
			};
		})()));
		this.set('price', 1000);
		this.set('deadline', new Date());
		var output = this.$().text();
		assert.ok(output);
	});

});
define('ember-intl-example/tests/integration/x-product-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/x-product-test.js should pass jshint', function() { 
    ok(true, 'integration/x-product-test.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/test-helper', ['ember-intl-example/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-intl-example/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-intl-example/tests/unit/x-product-test', ['ember-qunit', 'ember-intl-example/initializers/ember-intl'], function (ember_qunit, initializer) {

	'use strict';


	ember_qunit.moduleForComponent('x-product', 'XProductComponent', {
		unit: true,
		needs: ['service:intl', 'ember-intl@adapter:-intl-adapter', 'ember-intl@formatter:format-message', 'helper:intl-get'],
		setup: function setup() {
			var intl = this.container.lookup('service:intl');
			initializer['default'].initialize(this.container);
			intl.set('locale', 'en-us');
		}
	});

	ember_qunit.test('it renders', function (assert) {
		assert.expect(2);

		var component = this.subject({
			price: 1000,
			deadline: new Date()
		});

		assert.equal(component._state, 'preRender');
		this.render();
		assert.equal(component._state, 'inDOM');
	});

});
define('ember-intl-example/tests/unit/x-product-test.jshint', function () {

  'use strict';

  module('JSHint - unit');
  test('unit/x-product-test.js should pass jshint', function() { 
    ok(true, 'unit/x-product-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-intl-example/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-intl-example';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-intl-example/tests/test-helper");
} else {
  require("ember-intl-example/app")["default"].create({"name":"ember-intl-example","version":"0.0.0.5a244b38"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-intl-example.map