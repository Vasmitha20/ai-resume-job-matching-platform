import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HelpButton from '../components/HelpButton.jsx'
import CompatibilityScoreCard from '../components/CompatibilityScoreCard.jsx'
import ResumeSummaryCard from '../components/ResumeSummaryCard.jsx'
import SkillMatchCard from '../components/SkillMatchCard.jsx'
import MissingSkillsCard from '../components/MissingSkillsCard.jsx'
import ExperienceAnalysisCard from '../components/ExperienceAnalysisCard.jsx'
import ResumeSuggestionsCard from '../components/ResumeSuggestionsCard.jsx'
import CareerRoadmapCard from '../components/CareerRoadmapCard.jsx'
import CertificationsCard from '../components/CertificationsCard.jsx'
import JobRolesCard from '../components/JobRolesCard.jsx'
import ResultsActions from '../components/ResultsActions.jsx'
import '../styles/Results.css'

// ---------------------------------------------------------------------------
// Results.jsx — page layout only. Assembles reusable result cards and hands
// each of them the relevant slice of the backend response, received via
// router state:
//   const { state } = useLocation()
// No API calls happen on this page or in any card component.
//
// Expected shape of `state` (all fields optional — every card below falls
// back gracefully if a field isn't present yet):
//   {
//     compatibilityScore: number,       // 0-100
//     matchLabel: string,               // e.g. "Strong match"
//     headline: string,                 // e.g. "You are a competitive fit."
//     summary: string,
//     experienceScore: number,          // 0-100
//     skillsScore: number,              // 0-100
//     atsScore: number,                 // 0-100
//     confidence: string,               // e.g. "High"
//     resumeName: string,
//     selectedGoal: string,
//     jobTitle: string,
//     analysisDate: string,
//     totalSkills: number,
//     missingSkills: string[],
//     skillBreakdown: [{ name: string, score: number }, ...],
//     experienceInsights: [
//       { type: 'strength' | 'opportunity', title: string, description: string },
//       ...
//     ],
//     resumeSuggestions: string[],
//     roadmapSteps: [{ title: string, description: string }, ...],
//     certifications: [{ name: string, provider: string, url?: string }, ...],
//     jobRoles: [
//       { title, matchPercentage, fitLabel?, requiredSkills?, salary?, location? },
//       ...
//     ],
//     onDownloadPdf: function,          // optional, wired into ResultsActions
//   }
//
// If this page is opened without router state (e.g. a direct visit to
// /results), there is nothing to render — the user is redirected back to
// "/" instead of showing a broken/empty dashboard.
//
// This file is being built incrementally across several prompts. New cards
// get imported and slotted into the grid below without rewriting what's
// already here.
// ---------------------------------------------------------------------------

function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  
  const report = state?.report ?? null

  console.log("Results data:", report)

  useEffect(() => {
    if (!report) {
      navigate('/', { replace: true })
    }
  }, [report, navigate])

  const missingSkills = report?.missingSkills ?? []
  const skillBreakdown = [
  ...(report?.matchedSkills ?? []).map(skill => ({
    name: skill,
    score: 100
  })),
  ...(report?.missingSkills ?? []).map(skill => ({
    name: skill,
    score: 0
  }))
]
  const matchedSkillsCount =
    report?.matchedSkillsCount ??
    skillBreakdown.filter((skill) => (skill.score ?? 0) >= 60).length
  const totalSkills = report?.totalSkills ?? skillBreakdown.length

  const total =
    (report?.matchedSkills?.length ?? 0) +
    (report?.missingSkills?.length ?? 0)

  const matchPercentage =
    total === 0
      ? 0
      : Math.round(
        ((report?.matchedSkills?.length ?? 0) / total) * 100
        )

  if (!report) {
    // The redirect effect above will send the user back to "/". Render
    // nothing in the meantime rather than a broken/empty dashboard.
    return null
  }

  const experienceInsights = [
  {
    type: "strength",
    title: "Overall Recommendation",
    description: report.overallRecommendation
  },
  {
    type: "strength",
    title: "Transferable Skills",
    description: report.transferableSkills?.join(", ") ?? "No transferable skills identified."
  }
]

  return (
    <div className="page">
      <Navbar badge="Analysis / Complete" />

      <main>
        <div className="results-shell">
          <header className="results-header">
            <p className="eyebrow results-eyebrow">
              <span className="results-eyebrow-line" aria-hidden="true" />
              Career Intelligence Report
            </p>
            <h1 className="results-heading">Analysis Results</h1>
            <p className="results-subheading">
              Your resume has been successfully analyzed.
            </p>
          </header>

          <div className="results-row results-row-primary">
            <CompatibilityScoreCard
              score={report.candidateFitScore}
              matchLabel={report.matchLabel}
              headline={report.executiveSummary ?? report.overallRecommendation}
              summary={report.overallAnalysis}
            />
            <ResumeSummaryCard
              resumeName="Uploaded Resume"
              selectedGoal={report.goal}
              analysisDate={new Date().toLocaleDateString()}
              totalSkills={totalSkills}
              matchedSkillsCount={matchedSkillsCount}
              missingSkillsCount={missingSkills.length}
            />
          </div>

          <div className="results-row results-row-secondary">
            <SkillMatchCard
              skills={skillBreakdown}
              matchedCount={matchedSkillsCount}
              totalCount={totalSkills}
              matchPercentage={matchPercentage}
            />
            <MissingSkillsCard missingSkills={missingSkills} />
          </div>

          <div className="results-row results-row-secondary">
            <ExperienceAnalysisCard items={experienceInsights} />
            <ResumeSuggestionsCard
    suggestions={report.resumeImprovements ?? []}
/>
          </div>

          <div className="results-row results-row-roadmap">
            <CareerRoadmapCard steps={report.learningRoadmap ?? []} />
            <CertificationsCard certifications={report.certificationRecommendations ?? []} />
          </div>

          <div className="results-row-full">
            <JobRolesCard roles={report.jobRecommendations ?? []} />
          </div>

          <ResultsActions report={report} />
        </div>
      </main>

      <Footer tagline="Your personalized career analysis, ready to explore." />
      <HelpButton />
    </div>
  )
}

export default Results
