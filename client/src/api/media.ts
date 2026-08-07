import axios from "axios";
import type { Media } from "../types/MediaTypes";
import type { Response } from "../types/response";

export const getMedias = async (): Promise<Response<Media[]>> => {
    const response = await axios.get("/Media/allMedias");
    return response.data;
}

export const getMediaById = async (mediaID: string): Promise<Response<Media>> => {
    const response = await axios.get(`/Media/mediaId/${mediaID}`);
    return response.data;
}

export const addMedia = async (media: Media): Promise<Response<Media>> => {
    const response = await axios.post("/Media/addMedia", media);
    return response.data;
}

export const removeMedia = async (mediaID: string): Promise<Response<Media>> => {
    const response = await axios.delete(`/Media/removeMedia/${mediaID}`);
    return response.data;
}

export const editMedia = async (media: Media): Promise<Response<Media>> => {
    const response = await axios.put("/Media/editMedia", media);
    return response.data;
}