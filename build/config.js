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
    layouts: basePaths.src + 'views/layouts/',
    partials: basePaths.src + 'views/partials/',
    pages: basePaths.src + 'views/pages/'
  },
  data: {
    src: basePaths.src + 'data/',
    dist: basePaths.dist + 'data/'
  },
  lab: {
    src: basePaths.src + '_lab/',
    dist: basePaths.dist + '_lab/'
  }
};

var labFiles = {
  pages: paths.lab.src + 'views/pages/*.hbs',
  views: [
    paths.lab.src + 'views/layouts/**/*',
    paths.lab.src + 'views/partials/**/*'
  ],
  assets: [
    paths.lab.src + 'assets/**/*',
    '!' + paths.lab.src + 'assets/**/*.scss'
  ],
  accessJs: paths.lab.dist + 'access.js',
  styledownJs: paths.lab.dist + 'styledown.js',
  filelist: 'filelist.json',
  styles: {
    main: paths.lab.src + 'assets/styles/main.scss'
  },
  styledown: {
    view: paths.lab.src + 'views/layouts/styleguide.hbs',
    outputFile: 'styleguide.html'
  }
}

var inputFiles = {
  pages: paths.views.pages + '**/*',
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
  views: [
    paths.views.layouts + '**/*',
    paths.views.partials + '**/*'
  ]
};

var outputFiles = {
  scripts: {
    main: 'scripts.js'
  },
  styles: {
    main: 'styles.css'
  }
};

var styles = {
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
  styles: styles
};
