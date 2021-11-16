import { h, createApp } from "vue";
import createWidgetApp from "@web-widget/web-widget-vue";
import App from "./App.vue";
// import router from './router';

export default createWidgetApp({
  createApp,
  styles: App.styles,
  vueOptions(props: any) {
    return {
      provide: {
        host: props,
      },
      render() {
        return h(App, {
          // ...
        });
      },
    };
  },
  // handleInstance: (app) => {
  //   app.use(router);
  // }
});
