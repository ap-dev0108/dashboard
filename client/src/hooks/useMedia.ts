import { useQuery } from "@tanstack/react-query";
import { getMedias } from "../api/media";
    
export function useMedia() {
    return (
        useQuery({
            queryKey: ["media"],
            queryFn: getMedias,
        })
    );
}