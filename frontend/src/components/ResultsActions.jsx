import { useNavigate } from 'react-router-dom'
import API from "../services/api"

// ResultsActions
//
// Expected props:
//   onDownloadPdf   optional function, called when "Download PDF Report" is
//                   clicked. No PDF generation happens in this component —
//                   wire up the real behavior via this prop when the backend
//                   endpoint is ready.

function ResultsActions({ report }) {
  const navigate = useNavigate()

  const handleDownload = async () => {
  try {
    const response = await API.post(
      "/pdf/generate",
      report,
      {
        responseType: "blob",
      }
    )

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    )

    const link = document.createElement("a")

    link.href = url
    link.download = "Career_Report.pdf"

    document.body.appendChild(link)

    link.click()

    link.remove()

    window.URL.revokeObjectURL(url)

  } catch (error) {
    console.error(error)
    alert("Failed to generate PDF.")
  }
}

  const handleAnalyzeAnother = () => {
    navigate('/')
  }

  return (
    <div className="results-actions">
      <p className="results-actions-note">
        Your report is ready. Download a copy to keep your recommendations
        close during your application process.
      </p>

      <div className="results-actions-buttons">
        <button
          type="button"
          className="results-action-button results-action-primary"
          onClick={handleDownload}
        >
          <span aria-hidden="true">&#8595;</span>
          Download PDF Report
        </button>
        <button
          type="button"
          className="results-action-button results-action-secondary"
          onClick={handleAnalyzeAnother}
        >
          Analyze Another Resume
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  )
}

export default ResultsActions
