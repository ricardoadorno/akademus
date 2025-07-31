import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api-client';
import { Node, CreateNodeRequest, UpdateNodeRequest } from '@/types/node-types';

export const nodeService = {
  getNodesByCourseId: (courseId: number): Promise<Node[]> =>
    apiClient.get(`/nodes/course/${courseId}`).then(response => response.data),

  getNodeById: (id: number): Promise<Node> =>
    apiClient.get(`/nodes/${id}`).then(response => response.data),

  createNode: (data: CreateNodeRequest): Promise<Node> =>
    apiClient.post('/nodes', data).then(response => response.data),

  updateNode: (id: number, data: UpdateNodeRequest): Promise<Node> =>
    apiClient.put(`/nodes/${id}`, data).then(response => response.data),

  deleteNode: (id: number): Promise<void> => apiClient.delete(`/nodes/${id}`).then(() => undefined),
};

// React Query Hooks
export const useNodesByCourseId = (courseId: number) =>
  useQuery({
    queryKey: ['nodes', 'course', courseId],
    queryFn: () => nodeService.getNodesByCourseId(courseId),
    enabled: !!courseId, // Only run when courseId is available
  });

export const useNode = (id: number) =>
  useQuery({
    queryKey: ['nodes', id],
    queryFn: () => nodeService.getNodeById(id),
    enabled: !!id, // Only run when id is available
  });

export const useCreateNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNodeRequest) => nodeService.createNode(data),
    onSuccess: (_, variables) => {
      // Invalidate nodes for this course query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['nodes', 'course', variables.courseId] });
    },
  });
};

export const useUpdateNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNodeRequest }) =>
      nodeService.updateNode(id, data),
    onSuccess: updatedNode => {
      // Invalidate specific node query and nodes for this course list
      queryClient.invalidateQueries({ queryKey: ['nodes', updatedNode.id] });
      queryClient.invalidateQueries({ queryKey: ['nodes', 'course', updatedNode.courseId] });
    },
  });
};

export const useDeleteNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => nodeService.deleteNode(id),
    onSuccess: () => {
      // We'll need to invalidate the nodes list for the specific course
      // Since we don't have the courseId here, we'll invalidate all nodes queries
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
    },
  });
};
