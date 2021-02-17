import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
//타입스크립트 체크랑 웹팩이 동시에 돌아가게끔해줌 원래 타입스크립트 체크는 블락 방식으로 되기 때문에 비효율적임
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map', // Or eval
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },

        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*',
      },
    }), //타입스크립트 채크랑 웹팩이랑 동시에 돌아가게 해주는 것 (성능 향상 )
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }), // 리액트에서 NODE_ENV라는 변수를 사용할 수 있음. 프론트에서도 process.env.NODE_ENV 쌉가능
  ],
  output: {
    // 결과물이
    path: path.join(__dirname, 'dist'), // alecture/dist 폴더에
    filename: '[name].js', // app.js라는 이름으로 생긴다. [name]은 entry에서 설정된 키값이다. entry가 {app1: .client1.js, app2: .client2.js} 라면 app1.js와 app2.js파일이 생긴다 .
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true, //react -router 할 때 필요한 설정
    // 원래라면 SPA에서 서버에 보내지는 유효한 URL은 localhost:3090뿐이다. index.html만을 유일하게 보내기 때문
    // 하지만 historyApiFallback 설정을 true로 해놓으면, 클라이언트 사이드 네비게이션이 적용된 상태로 페이지를 띄어준다.
    // 쉽게 말해 URL을 속이는 것
    port: 3090, //프론트 서버 포트번호
    publicPath: '/dist/',
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3095',
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (isDevelopment && config.plugins) {
  //개발환경일 때 쓸 플러그인
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  //   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }));
}
if (!isDevelopment && config.plugins) {
  //배포환경에서 쓸 플러그인
  //   config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  //   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
