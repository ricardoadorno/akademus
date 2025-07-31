export const PATHS = {
  login: '/',
  register: '/register',
  app: '/app',
  dashboard: '/app/dashboard',
  courseDetail: (id: string) => `/app/courses/${id}`,
} as const;
