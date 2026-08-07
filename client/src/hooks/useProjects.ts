import {getProjects, getProjectsById, getProjectByType, addProjects, removeProjects, editProjects} from "../api/project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetProjects() {
    return (
        useQuery({
            queryKey: ["projects"],
            queryFn: getProjects,
        })
    );
}

export function useGetProjectsById(projectID: string) {
    return (
        useQuery({
            queryKey: ["projects", projectID],
            queryFn: () => getProjectsById(projectID),
        })
    );
}

export function useGetProjectByType(projectType: string) {
    return (
        useQuery({
            queryKey: ["projects", projectType],
            queryFn: () => getProjectByType(projectType),
        })
    );
}

export function useAddProjects() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProjects,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
    });
}

export function useRemoveProjects() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeProjects,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    });
}

export function useEditProjects() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProjects,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    });
}