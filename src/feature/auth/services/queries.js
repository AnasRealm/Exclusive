import { useQuery } from "@tanstack/react-query";
import { userStorage } from "../storage";
import AuthServices from './api';

export function useGetMeQuery() {
    const id = userStorage.get();
    return useQuery({
        queryKey: ['users', id],
        queryFn: async () => await AuthServices.getMe()
    })
}