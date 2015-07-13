/* jshint ignore:start */

/* jshint ignore:end */

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
define('ember-intl-example/cldrs/en-001', ['exports'], function (exports) {

	'use strict';

	/*jslint eqeq: true*/
	exports['default'] = { "locale": "en-001", "parentLocale": "en" };

});
define('ember-intl-example/cldrs/en-gb', ['exports'], function (exports) {

	'use strict';

	/*jslint eqeq: true*/
	exports['default'] = { "locale": "en-GB", "parentLocale": "en-001" };

});
define('ember-intl-example/cldrs/en-us', ['exports'], function (exports) {

	'use strict';

	/*jslint eqeq: true*/
	exports['default'] = { "locale": "en-US", "parentLocale": "en" };

});
define('ember-intl-example/cldrs/en', ['exports'], function (exports) {

  'use strict';

  /*jslint eqeq: true*/
  exports['default'] = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
    }, "fields": { "year": { "displayName": "Year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "Month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "Day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "Hour", "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "Minute", "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "Second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };

});
define('ember-intl-example/cldrs/fr-fr', ['exports'], function (exports) {

	'use strict';

	/*jslint eqeq: true*/
	exports['default'] = { "locale": "fr-FR", "parentLocale": "fr" };

});
define('ember-intl-example/cldrs/fr', ['exports'], function (exports) {

  'use strict';

  /*jslint eqeq: true*/
  exports['default'] = { "locale": "fr", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      if (ord) return n == 1 ? "one" : "other";return n >= 0 && n < 2 ? "one" : "other";
    }, "fields": { "year": { "displayName": "année", "relative": { "0": "cette année", "1": "l’année prochaine", "-1": "l’année dernière" }, "relativeTime": { "future": { "one": "dans {0} an", "other": "dans {0} ans" }, "past": { "one": "il y a {0} an", "other": "il y a {0} ans" } } }, "month": { "displayName": "mois", "relative": { "0": "ce mois-ci", "1": "le mois prochain", "-1": "le mois dernier" }, "relativeTime": { "future": { "one": "dans {0} mois", "other": "dans {0} mois" }, "past": { "one": "il y a {0} mois", "other": "il y a {0} mois" } } }, "day": { "displayName": "jour", "relative": { "0": "aujourd’hui", "1": "demain", "2": "après-demain", "-1": "hier", "-2": "avant-hier" }, "relativeTime": { "future": { "one": "dans {0} jour", "other": "dans {0} jours" }, "past": { "one": "il y a {0} jour", "other": "il y a {0} jours" } } }, "hour": { "displayName": "heure", "relativeTime": { "future": { "one": "dans {0} heure", "other": "dans {0} heures" }, "past": { "one": "il y a {0} heure", "other": "il y a {0} heures" } } }, "minute": { "displayName": "minute", "relativeTime": { "future": { "one": "dans {0} minute", "other": "dans {0} minutes" }, "past": { "one": "il y a {0} minute", "other": "il y a {0} minutes" } } }, "second": { "displayName": "seconde", "relative": { "0": "maintenant" }, "relativeTime": { "future": { "one": "dans {0} seconde", "other": "dans {0} secondes" }, "past": { "one": "il y a {0} seconde", "other": "il y a {0} secondes" } } } } };

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
    actions: {
      changeLocale: function changeLocale(localeName) {
        this.set('intl.locale', localeName);
      }
    },
    locales: Ember['default'].A(['en-us', 'en-gb', 'fr-fr']),
    num: 1000,
    now: now,
    yesterday: yesterday,
    threeDaysAgo: threeDaysAgo,
    incrementTime: Ember['default'].on('init', function () {
      var _this = this;

      Ember['default'].run.later(this, function () {
        _this.set('now', new Date());
        _this.incrementProperty('num');
        _this.incrementTime();
      }, 1000);
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
define('ember-intl-example/helpers/intl-get', ['exports', 'ember', 'ember-intl/legacy/helpers/intl-get', 'ember-intl/helpers/intl-get'], function (exports, Ember, legacyIntlGet, IntlGet) {

  'use strict';

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  var Helper = IntlGet['default'];

  if (!Helper) {
    Helper = legacyIntlGet['default'];
  }

  exports['default'] = Helper;

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
define('ember-intl-example/initializers/ember-intl', ['exports', 'ember', 'ember-intl/helpers/format-date', 'ember-intl/helpers/format-time', 'ember-intl/helpers/format-relative', 'ember-intl/helpers/format-number', 'ember-intl/helpers/format-html-message', 'ember-intl/helpers/format-message', 'ember-intl/utils/register-helper', 'ember-intl-example/instance-initializers/ember-intl'], function (exports, Ember, FormatDate, FormatTime, FormatRelative, FormatNumber, FormatHtmlMessage, FormatMessage, registerHelper, ember_intl) {

    'use strict';

    exports.initializer = initializer;

    function initializer(registry) {
        var app = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        registry.optionsForType('formats', {
            singleton: true,
            instantiate: false
        });

        registerHelper['default']('format-date', FormatDate['default'], registry);
        registerHelper['default']('format-time', FormatTime['default'], registry);
        registerHelper['default']('format-relative', FormatRelative['default'], registry);
        registerHelper['default']('format-number', FormatNumber['default'], registry);
        registerHelper['default']('format-html-message', FormatHtmlMessage['default'], registry);
        registerHelper['default']('format-message', FormatMessage['default'], registry);

        if (app.instanceInitializer) {
            return;
        }

        // for backwards compatability < 1.12
        ember_intl.instanceInitializer({
            container: registry
        });
    }

    exports['default'] = {
        name: 'ember-intl',
        initialize: initializer
    };

});
define('ember-intl-example/instance-initializers/ember-intl', ['exports', 'ember-intl-example/config/environment', 'ember-intl/utils/add-locale-data'], function (exports, ENV, addLocaleData) {

    'use strict';

    exports.instanceInitializer = instanceInitializer;

    function filterBy(env, type) {
        return Object.keys(requirejs._eak_seen).filter(function (key) {
            return key.indexOf(env.modulePrefix + '/' + type + '/') === 0;
        });
    }
    function instanceInitializer(instance) {
        var service = instance.container.lookup('service:intl');

        filterBy(ENV['default'], 'cldrs').forEach(function (key) {
            addLocaleData['default'](require(key, null, null, true)['default']);
        });

        filterBy(ENV['default'], 'translations').forEach(function (key) {
            var localeSplit = key.split('/');
            var locale = localeSplit[localeSplit.length - 1];
            service.createLocale(locale, require(key, null, null, true)['default']);
        });
    }

    exports['default'] = {
        name: 'ember-intl',
        initialize: instanceInitializer
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
				imageUrl: 'iphone-b550b0afa05ecded68d9d63c25d0d5aa.png'
			}, {
				name: 'xbox',
				price: 350,
				imageUrl: 'xbox-04b6f6dd3edab32adff001c435577a64.png'
			}, {
				name: 'playstation',
				price: 400,
				imageUrl: 'playstation-a8184422be2c68617faf0be70538fa7b.png'
			}, {
				name: 'gameboy',
				price: 50,
				imageUrl: 'gameboy-3be8bcb10c049634dbc635bb58c404ce.png'
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
define('ember-intl-example/services/intl', ['exports', 'ember-intl/services/intl'], function (exports, IntlService) {

	'use strict';

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */

	exports['default'] = IntlService['default'];

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
define('ember-intl-example/translations/en-gb', ['exports'], function (exports) {

	'use strict';

	exports['default'] = {"product":{"info":"{price, number, EUR} if ordered by {deadline, date, time}","buy":"buy","title":"Product Listing"}};

});
define('ember-intl-example/translations/en-us', ['exports'], function (exports) {

	'use strict';

	exports['default'] = {"product":{"info":"{price, number, USD} if ordered by {deadline, date, time}","buy":"buy","title":"Product Listing"}};

});
define('ember-intl-example/translations/fr-fr', ['exports'], function (exports) {

	'use strict';

	exports['default'] = {"product":{"info":"{price, number, EUR} si acheté par {deadline, date, time}","buy":"acheter","title":"liste des produits"}};

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
  require("ember-intl-example/app")["default"].create({"name":"ember-intl-example","version":"0.0.0.7fbbde12"});
}

/* jshint ignore:end */
