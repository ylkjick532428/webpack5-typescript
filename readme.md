1. change you sdk key in config.ts
2. npm install && npm run corp
3. open http://127.0.0.1:9999/

if want to test 3.1.6 in you project 
## npm install

npm install https://d27xp8zu78jmsf.cloudfront.net/jssdk/3.1.6-2024-01-31-1m7unf-install.tar.gz

## cdn install
    <script src="https://source.zoom.us/3.1.4/lib/vendor/react.min.js"></script>
    <script src="https://source.zoom.us/3.1.4/lib/vendor/react-dom.min.js"></script>
    <script src="https://source.zoom.us/3.1.4/lib/vendor/redux.min.js"></script>
    <script src="https://source.zoom.us/3.1.4/lib/vendor/redux-thunk.min.js"></script>
    <script src="https://source.zoom.us/3.1.4/lib/vendor/lodash.min.js"></script>
    <script src="https://d27xp8zu78jmsf.cloudfront.net/jssdk/2024-01-31-1m7unf/cdn/zoom-meeting-3.1.6.min.js"></script>

call 
ZoomMtg.setZoomJSLib('https://d27xp8zu78jmsf.cloudfront.net/jssdk/2024-01-31-1m7unf/cdn/lib', '/av');
before ZoomMtg.prepareWebSDK();

