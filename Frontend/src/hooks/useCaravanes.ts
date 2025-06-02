
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import caravaneService, { CaravaneDto, CreateCaravaneDto } from '@/services/caravaneService';

export const useCaravanes = () => {
  return useQuery({
    queryKey: ['caravanes'],
    queryFn: () => caravaneService.getAllCaravanes(),
  });
};

export const useCaravane = (id: string) => {
  return useQuery({
    queryKey: ['caravane', id],
    queryFn: () => caravaneService.getCaravaneById(id),
    enabled: !!id,
  });
};

export const useCreateCaravane = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCaravaneDto) => caravaneService.createCaravane(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caravanes'] });
    },
  });
};

export const useUpdateCaravane = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCaravaneDto }) => 
      caravaneService.updateCaravane(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caravanes'] });
    },
  });
};

export const useDeleteCaravane = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => caravaneService.deleteCaravane(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caravanes'] });
    },
  });
};

export const useParticipateInCaravane = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => caravaneService.participateInCaravane(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caravanes'] });
    },
  });
};
