import axios from "axios";
import type { ProjectTypes } from "../types/ProjectTypes";
import type { Response } from "../types/response";

export const getProjects = async () : Promise<Response<ProjectTypes[]>> => {
    const response = await axios.get("/Project/allProjects");
    return response.data;
}