const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const less = require('gulp-less');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');
const through = require('through2');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const vite = require('vite');
const packageJson = require('./package.json');

const paths = {
  dest: {
    cjs: 'lib/cjs', // commonjs 文件存放的目录名
    es: 'lib/es', // ES module 文件存放的目录名
    umd: 'lib/umd', // umd 文件存放的目录名
    pkg: 'lib' // package.json 文件存放的目录名
  },
  styles: ['src/**/*.less', '!**/demos/**/*'], // 样式文件路径
  scripts: ['src/**/*.{ts,tsx}', '!**/demos/**/*'], // 脚本文件路径
  pkg: ['./package.json']
};

// 将less打包成css
function buildLess() {
  return gulp
    .src(paths.styles)
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true
      })
    )
    .pipe(gulp.dest(paths.dest.cjs))
    .pipe(gulp.dest(paths.dest.es));
}

// 生成声明文件
function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext',
    declaration: true,
    emitDeclarationOnly: true
  });
  return gulp
    .src(paths.scripts)
    .pipe(tsProject)
    .pipe(gulp.dest(paths.dest.cjs))
    .pipe(gulp.dest(paths.dest.es));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext'
  });
  return gulp
    .src(paths.scripts)
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: [
          {
            visitor: {
              ImportDeclaration(path, source) {
                if (path.node.source.value.endsWith('.less')) {
                  path.node.source.value = path.node.source.value.replace(
                    /\.less$/,
                    '.css'
                  );
                }
              }
            }
          }
        ]
      })
    )
    .pipe(gulp.dest(paths.dest.es));
}

function buildCJS() {
  return gulp
    .src('lib/es/**/*.js')
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(gulp.dest(paths.dest.cjs));
}

function generatePackageJSON() {
  return gulp
    .src(paths.pkg)
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      })
    )
    .pipe(gulp.dest(paths.dest.pkg));
}

function getViteConfigForPackage({ env, formats, external }) {
  const name = packageJson.name;
  const isProd = env === 'production';
  return {
    root: process.cwd(),
    mode: env,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': `"${env}"` },
    build: {
      cssTarget: 'chrome61',
      lib: {
        name: 'qnet-ui-mobile',
        entry: './lib/es/index.js',
        formats,
        fileName: format => `${name}.${format}${isProd ? '' : `.${env}`}.js`
      },
      rollupOptions: {
        external,
        output: {
          dir: './lib/bundle',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      minify: isProd ? 'esbuild' : false
    }
  };
}

async function buildBundles(cb) {
  const envs = ['development', 'production'];
  const configs = envs.map(env =>
    getViteConfigForPackage({
      env,
      formats: ['es', 'cjs', 'umd'],
      external: ['react', 'react-dom']
    })
  );

  await Promise.all(configs.map(config => vite.build(config)));
  cb && cb();
}

function umdWebpack() {
  return gulp
    .src('lib/es/index.js')
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'qnet-ui-mobile.js',
            library: {
              type: 'umd',
              name: 'qnetMobileUI'
            }
          },
          mode: 'production',
          optimization: {
            usedExports: true
          },
          performance: {
            hints: false
          },
          resolve: {
            extensions: ['.js', '.json']
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          loose: true,
                          modules: false,
                          targets: {
                            chrome: '49',
                            ios: '10'
                          }
                        }
                      ],
                      '@babel/preset-typescript',
                      '@babel/preset-react'
                    ]
                  }
                }
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
              }
            ]
          },
          externals: [
            {
              react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React'
              },
              'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
                root: 'ReactDOM'
              }
            }
          ]
        },
        webpack
      )
    )
    .pipe(gulp.dest(paths.dest.umd));
}

const build = gulp.series(
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildLess),
  generatePackageJSON,
  buildBundles,
  umdWebpack
);

exports.default = build;
