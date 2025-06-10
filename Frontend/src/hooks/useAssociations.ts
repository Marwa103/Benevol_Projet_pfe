
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import associationService from '@/services/associationService';
import { AssociationDto, AidRequestDto, CreateAidRequestDto } from '@/utils/backendTypes';

export const useAssociations = () => {
  return useQuery({
    queryKey: ['associations'],
    queryFn: () => associationService.getAllAssociations(),
  });
};

export const useAssociation = (id: string) => {
  return useQuery({
    queryKey: ['association', id],
    queryFn: () => associationService.getAssociationById(id),
    enabled: !!id,
  });
};

export const useMyAidRequests = () => {
  return useQuery({
    queryKey: ['my-aid-requests'],
    queryFn: () => associationService.getMyAidRequests(),
  });
};

export const useAllAidRequests = () => {
  return useQuery({
    queryKey: ['all-aid-requests'],
    queryFn: () => associationService.getAllAidRequests(),
  });
};

export const useCreateAidRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAidRequestDto) => associationService.createAidRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-aid-requests'] });
      queryClient.invalidateQueries({ queryKey: ['all-aid-requests'] });
    },
  });
};

export const useApproveAidRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => associationService.approveAidRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aid-requests'] });
    },
  });
};

export const useRejectAidRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => associationService.rejectAidRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aid-requests'] });
    },
  });
};

export const useApprovedAssociation = () => {
  return useMutation({
    mutationFn: (id: string) => associationService.approvedAssociation(id),
    onSuccess: () => {
      console.log("La mise à jour à bien été faite.")
    },
  });
};