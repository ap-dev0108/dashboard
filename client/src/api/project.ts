import axios from "axios";
import type { ProjectTypes } from "../types/ProjectTypes";
import type { Response } from "../types/response";

export const getProjects = async () : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.get("/Project/allProjects");
    return response.data;
}

export const getProjectsById = async (projectID: string) : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.get(`/Project/projectId/${projectID}`);
    return response.data;
}

export const getProjectByType = async (projectType: string) : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.get(`/Project/type/${projectType}`);
    return response.data;
}

export const addProjects = async (project: ProjectTypes) : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.post("/Project/add", project);
    return response.data;
}

export const removeProjects = async (projectID: string) : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.delete(`/Project/remove/${projectID}`);
    return response.data;
}

export const editProjects = async (project: ProjectTypes) : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.put("/Project/editProjects", project);
    return response.data;
}