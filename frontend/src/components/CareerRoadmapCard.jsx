function CareerRoadmapCard({ steps = [] }) {
  return (
    <div className="result-card roadmap-card">
      <div className="result-card-top">
        <p className="eyebrow">Career Growth</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>

      <h2 className="result-card-title">
        Personalized Career Roadmap
      </h2>

      {steps.length === 0 ? (
        <p className="roadmap-empty">
          No learning roadmap is generated when analyzing a specific job application.
Switch to "Preparing for My Dream Career" to receive a personalized roadmap.
        </p>
      ) : (
        <div className="roadmap-grid">
          {steps.map((step, index) => (
            <div
              className="roadmap-step"
              key={`${step.phase}-${index}`}
            >
              <span className="roadmap-step-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="roadmap-step-title">
                {step.phase}
              </h3>

              <p className="roadmap-step-focus">
                <strong>Focus:</strong> {step.focus}
              </p>

              <ul className="roadmap-actions">
                {step.actionSteps?.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>

              <p className="roadmap-milestone">
                <strong>Milestone:</strong> {step.milestone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CareerRoadmapCard