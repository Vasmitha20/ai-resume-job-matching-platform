function JobRoleTile({ role }) {
  return (
    <div className="job-role-tile">
      <h3 className="job-role-title">
        {role.title}
      </h3>

      <p className="job-role-relevance">
        {role.relevance}
      </p>
    </div>
  )
}

function JobRolesCard({ roles = [] }) {
  return (
    <div className="result-card job-roles-card">
      <div className="result-card-top">
        <p className="eyebrow">Career Opportunities</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>

      <h2 className="result-card-title">
        Recommended Job Roles
      </h2>

      {roles.length === 0 ? (
        <p className="job-roles-empty">
          Job recommendations are available only for the
"Preparing for My Dream Career" analysis.
        </p>
      ) : (
        <div className="job-roles-grid">
          {roles.map((role, index) => (
            <JobRoleTile
              key={`${role.title}-${index}`}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default JobRolesCard
