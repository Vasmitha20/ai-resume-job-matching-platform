function CertificationsCard({ certifications = [] }) {
  return (
    <div className="result-card certifications-card">
      <div className="result-card-top">
        <p className="eyebrow">Learning signal</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>

      <h2 className="result-card-title">
        Recommended certifications
      </h2>

      {certifications.length === 0 ? (
        <p className="certifications-empty">
          Certification recommendations will appear here once analysis data
          is available.
        </p>
      ) : (
        <ul className="certifications-list">
          {certifications.map((cert) => {

            return (
              <li
                className="certification-item"
                key={`${cert.name}-${cert.issuer}`}
              >
                <div className="certification-row">
                  <span className="certification-label">
                    {cert.name}
                  </span>

                  {cert.issuer && (
    <p className="certification-issuer">
      {cert.issuer}
    </p>
  )}

                  <p className="certification-value">
                    {cert.value}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CertificationsCard