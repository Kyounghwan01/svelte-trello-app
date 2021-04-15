import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import sveltePreprocess from "svelte-preprocess";

// rollup watch 기능(-w)이 동작하는 경우만 개발모드로 판단
const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;

      // 서버 생성
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    }
  };
}

export default {
  // 진입점
  input: "src/main.js",
  // 번들 출력
  output: {
    // 번들의 소스맵 파일을 생성, 소스맵은 난독화 파일을 해석하여 성능 향상 .map파일
    sourcemap: true,
    // 번들 포맷 html의 script에 적합한 포맷
    format: "iife",
    // 번들의 전역 변수 이름, 'iife' 포멧사용하는경우 필수
    name: "app",
    // 번들이 생성되는 경로
    file: "public/build/bundle.js"
  },
  plugins: [
    svelte({
      compilerOptions: {
        // 개발 모드에서 런타임 검사 활성
        dev: !production
      },
      // 전처리
      preprocess: sveltePreprocess({
        // 전역 scss 설정 컴포넌트의 style이 <style lang="scss"> 일 경우만
        scss: {
          prependData: '@import "./src/scss/main.scss";'
        },
        // css 번들 이후 처리
        postcss: {
          plugins: [require("autoprefixer")()]
        }
      })
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),
    // 절대경로 alias 추가하기
    alias({
      entries: [
        {
          find: "~",
          replacement: path.resolve(__dirname, "src/")
        }
      ]
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
