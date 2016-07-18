"use strict";

var serverPort = 3020;

var jsAccess = {
  enabled: true,
  passwords: [
    "password",
    "MyNameIsAndrewBlackledge!",
    "An0th3r_P455w0rd!"
  ]
};

var basePaths = {
  src: 'src/',
  dist: 'dist/',
  content: 'content/'
};

var paths = {
  scripts: {
    src: basePaths.src + 'scripts/',
    dist: basePaths.dist + 'scripts/'
  },
  styles: {
    src: basePaths.src + 'styles/',
    dist: basePaths.dist + 'styles/'
  },
  images: {
    src: basePaths.src + 'assets/images/',
    dist: basePaths.dist + 'images/'
  },
  fonts: {
    src: basePaths.src + 'assets/fonts/',
    dist: basePaths.dist + 'fonts/'
  },
  media: {
    src: basePaths.src + 'assets/media/',
    dist: basePaths.dist + 'media/'
  },
  views: {
    src: basePaths.src + 'views/',
    pages: basePaths.src + 'views/pages/'
  },
  data: {
    src: basePaths.src + 'data/',
    dist: basePaths.dist + 'data/'
  },
  lab: {
    src: basePaths.src + '_lab/',
    dist: basePaths.dist + '_lab/'
  },
  styleguide: {
    src: basePaths.src + 'styleguide/',
    dist: basePaths.dist + 'styleguide/'
  }
};

var files = {
  lab: {
    pages: paths.lab.src + 'views/pages/*.hbs',
    views: {
      layouts: paths.lab.src +  'views/layouts/**/*.hbs',
      partials: paths.lab.src +  'views/partials/**/*.hbs'
    },
    assets: [
      paths.lab.src + 'assets/**/*',
      '!' + paths.lab.src + 'assets/**/*.scss'
    ],
    accessJs: paths.lab.dist + 'access.js',
    pageList: 'pageList.json',
    styles: {
      inputFile: paths.lab.src + 'assets/styles/main.scss'
    }
  },
  pages: paths.views.pages + '/**/*.hbs',
  data: paths.data.src + '**/*.json',
  scripts: {
    inputFile: paths.scripts.src + 'index.js',
    outputFile: 'scripts.js'
  },
  styles: {
    itcss: [
      paths.styles.src + '_settings/**/*.scss',
      paths.styles.src + '_tools/**/*.scss',
      paths.styles.src + '_generic/**/*.scss',
      paths.styles.src + '_elements/**/*.scss',
      paths.styles.src + '_objects/**/*.scss',
      paths.styles.src + '_components/**/*.scss',
      paths.styles.src + '_trumps/**/*.scss'
    ],
    generateFile: paths.styles.src + 'styles.scss',
    outputFile: 'styles.css',
  },
  views: {
    layouts: paths.views.src + 'layouts/**/*.hbs',
    partials: paths.views.src + 'partials/**/*.hbs'
  },
  styleguide: {
    outputFile: 'styleguide.html',
    js: paths.styleguide.src + 'styleguide.js',
    sass: paths.styleguide.src + 'styleguide.scss'
  }
};

var styleOptions = {
  autoprefixer: {
    browsers: [
      'last 3 versions',
      'ie 9',
      'iOS 7'
    ]
  },
  pxtorem: {
    replace: true,
    selector_black_list: [],
    prop_white_list: []
  }
};

module.exports = {
  serverPort: serverPort,
  jsAccess: jsAccess,
  basePaths: basePaths,
  paths: paths,
  files: files,
  styleOptions: styleOptions
};
