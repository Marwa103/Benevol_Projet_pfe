
import { useQuery } from '@tanstack/react-query';
import userService, { UserProfile } from '@/services/userService';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
