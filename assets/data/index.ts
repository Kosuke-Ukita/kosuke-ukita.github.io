import profile from './profile.yaml'
import publications from './publications.yaml'
import pages from './pages.yaml'
import others from './others.yaml'

import awardsData from './awards.yaml'
const awards = awardsData.en
const awardsJp = awardsData.jp

import grantsData from './grants.yaml'
const grants = grantsData.en
const grantsJp = grantsData.jp

import educationData from './education.yaml'
const education = educationData.en
const educationJp = educationData.jp

import experienceData from './experience.yaml'
const experience = experienceData.en
const experienceJp = experienceData.jp

export {
  profile,
  publications,
  pages,
  others,
  awards, awardsJp,
  grants, grantsJp,
  education, educationJp,
  experience, experienceJp,
}