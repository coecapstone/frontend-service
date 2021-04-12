import { createGlobalStyle } from 'styled-components';


export const GlobalIcon = createGlobalStyle`

  @font-face {font-family: "iconfont";
    src: url('./iconfont.eot?t=1618156043790'); /* IE9 */
    src: url('./iconfont.eot?t=1618156043790#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
    url('./iconfont.woff?t=1618156043790') format('woff'),
    url('./iconfont.ttf?t=1618156043790') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('./iconfont.svg?t=1618156043790#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 23px;
    font-style: normal;
    margin: 0 8px 0 13px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

