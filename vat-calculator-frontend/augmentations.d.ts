export {};

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    roles: string[];
  }
}
