import Vue from "vue";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("required", required);
extend("email", email);
