import profile from './profile.yaml'
import publications from './publications.yaml'
import others from './others.yaml'

import awardsData from './awards.yaml'
const awards = awardsData.en
const awards_jp = awardsData.jp

import grantsData from './grants.yaml'
const grants = grantsData.en
const grants_jp = grantsData.jp

import educationData from './education.yaml'
const education = educationData.en
const education_jp = educationData.jp

import experienceData from './experience.yaml'
const experience = experienceData.en
const experience_jp = experienceData.jp

export {
    profile,
    publications,
    others,
    awards, awards_jp,
    grants, grants_jp,
    education, education_jp,
    experience, experience_jp
}