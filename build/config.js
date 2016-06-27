"use strict";

var serverPort = 3020;

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

var labFiles = {
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
    main: paths.lab.src + 'assets/styles/main.scss'
  }
}

var inputFiles = {
  pages: paths.views.pages + '/**/*.hbs',
  data: paths.data.src + '**/*.json',
  scripts: {
    main: paths.scripts.src + 'index.js'
  },
  styles: {
    main: paths.styles.src + 'styles.scss',
    itcss: [
      paths.styles.src + '_settings/**/*.scss',
      paths.styles.src + '_tools/**/*.scss',
      paths.styles.src + '_generic/**/*.scss',
      paths.styles.src + '_elements/**/*.scss',
      paths.styles.src + '_objects/**/*.scss',
      paths.styles.src + '_components/**/*.scss',
      paths.styles.src + '_trumps/**/*.scss'
    ]
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

var outputFiles = {
  scripts: {
    main: 'scripts.js'
  },
  styles: {
    main: 'styles.css'
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
  basePaths: basePaths,
  paths: paths,
  labFiles: labFiles,
  inputFiles: inputFiles,
  outputFiles: outputFiles,
  styleOptions: styleOptions
};
