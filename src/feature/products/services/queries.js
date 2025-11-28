import { useQuery } from '@tanstack/react-query';
import ProductsServices from './api';

export function useProducts(limit = 20, offset = 0) {
  return useQuery({
    queryKey: ['products', limit, offset],
    queryFn: () => ProductsServices.getProducts(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => ProductsServices.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProductsByCategory(categoryId, limit = 10) {
  return useQuery({
    queryKey: ['products', 'category', categoryId, limit],
    queryFn: () => ProductsServices.getProductsByCategory(categoryId, limit),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductsServices.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}