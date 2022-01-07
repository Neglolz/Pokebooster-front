import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import User from "@/types/User.interface";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    user: User;
    isLoggedIn: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
