export interface ProjectType {
    ProjectTitle: string,
    LiveURL: string,
    GithubURL: string,
    ImageURL: string,
    Type: ProjectTypeEnum
}

export enum ProjectTypeEnum {
    WebApp = "Web App",
    MobileApp = "Mobile App",
    WixTemplates = "Wix Templates",
    Management = "Management",
}