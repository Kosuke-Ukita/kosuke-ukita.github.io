import profile from './profile.yaml'
import publications from './publications.yaml'
import news from './news.yaml'
import others from './others.yaml'
import awardsData from './awards.yaml'
import grantsData from './grants.yaml'
import educationData from './education.yaml'
import experienceData from './experience.yaml'

export { profile, publications, news, others }

export const awards = awardsData.en
export const awards_jp = awardsData.jp

export const grants = grantsData.en
export const grants_jp = grantsData.jp

export const education = educationData.en
export const education_jp = educationData.jp

export const experience = experienceData.en
export const experience_jp = experienceData.jp
