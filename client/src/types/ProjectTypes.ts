export enum ProjectTypeEnum {
    WebApp = "Web App",
    MobileApp = "Mobile App",
    WixTemplates = "Wix Templates",
    Management = "Management",
}

export interface ProjectTypes {
    ProjectTitle: string,
    LiveURL: string,
    GithubURL: string,
    ImageURL: string,
    Type: ProjectTypeEnum
}