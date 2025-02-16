export interface NhostAuthMethods {
  register: (email: string, password: string, role?: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

declare module '#app' {
  interface NuxtApp {
    auth: NhostAuthMethods;
  }
}

// Étendre le type global pour Vue
declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: NhostAuthMethods;
  }
}
