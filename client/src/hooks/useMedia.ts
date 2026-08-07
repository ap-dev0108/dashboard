import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMedias, addMedia, getMediaById, removeMedia, editMedia } from "../api/media";
    
export function useMedia() {
    return (
        useQuery({
            queryKey: ["media"],
            queryFn: getMedias,
        })
    );
}

export function useMediaById(mediaID: string) {
    return (
        useQuery({
            queryKey: ["media", mediaID],
            queryFn: () => getMediaById(mediaID),
        })
    );
}

export function useAddMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addMedia"] });
        },
    });
}

export function useEditMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["editMedia"] });
        },
    })
}

export function useRemoveMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["removeMedia"] });
        },
    });
}