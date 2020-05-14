var destRoot = './'
var vendorRoot = '../node_modules/'

var vendorScripts = [
  // vendorRoot + 'isotope-layout/js/isotope.js',
  // vendorRoot + 'isotope-layout/js/item.js',
  // vendorRoot + 'isotope-layout/js/layout-mode.js',
  vendorRoot + 'slick-carousel/slick/slick.min.js'
]

module.exports = {
  root: destRoot,
  styles: {
    watch: './assets/scss/**/*.scss',
    src: './assets/scss/*.scss',
    dest: destRoot + 'assets/css/'
  },
  scripts: {
    watch: './assets/scripts/**/*.js',
    // src: './assets/scripts/**/*.js',
    src: ([
      // './assets/scripts/vendor/*.js',
      './assets/scripts/global.js',
      './assets/scripts/partials/*.js',
      // './assets/scripts/app.js'
    ]),
    vendor: vendorScripts,
    dest: destRoot + 'assets/js/'
  },
  php: {
    src: destRoot + './**/*.php',
    dest: destRoot
  }
}