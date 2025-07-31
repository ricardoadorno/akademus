import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api-client';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '@/types/course-types';

export const courseService = {
  getCourses: (): Promise<Course[]> => apiClient.get('/courses').then(response => response.data),

  getCourseById: (id: number): Promise<Course> =>
    apiClient.get(`/courses/${id}`).then(response => response.data),

  createCourse: (data: CreateCourseRequest): Promise<Course> =>
    apiClient.post('/courses', data).then(response => response.data),

  updateCourse: (id: number, data: UpdateCourseRequest): Promise<Course> =>
    apiClient.patch(`/courses/${id}`, data).then(response => response.data),

  deleteCourse: (id: number): Promise<void> =>
    apiClient.delete(`/courses/${id}`).then(() => undefined),
};

// React Query Hooks
export const useCourses = () =>
  useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getCourses,
  });

export const useCourse = (id: number) =>
  useQuery({
    queryKey: ['courses', id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id, // Only run when id is available
  });

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseRequest) => courseService.createCourse(data),
    onSuccess: () => {
      // Invalidate courses query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCourseRequest }) =>
      courseService.updateCourse(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific course query and courses list
      queryClient.invalidateQueries({ queryKey: ['courses', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => courseService.deleteCourse(id),
    onSuccess: () => {
      // Invalidate courses query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
