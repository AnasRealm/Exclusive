import { useMutation } from '@tanstack/react-query';
import AuthServices from './api';

export function useSignUpMutation() {
    return useMutation({
        mutationFn: async payload => await AuthServices.signUp(payload)
    })
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: async payload => await AuthServices.login(payload)
    })
}