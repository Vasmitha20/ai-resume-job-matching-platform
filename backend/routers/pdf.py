from io import BytesIO

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from fastapi import Body

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)

@router.post("/generate")
async def generate_pdf(
    report: dict = Body(...)
):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()
    score = report.get("candidateFitScore", "N/A")
    summary = report.get("executiveSummary", "No executive summary available.")
    analysis = report.get("overallAnalysis", "No analysis available.")

    story = []

    story.append(
        Paragraph(
            "AI Resume Job Matching Report",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Candidate Fit Score:</b> {score}%",
            styles["Heading2"]
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            f"<b>Executive Summary</b><br/><br/>{summary}",
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            f"<b>Overall Analysis</b><br/><br/>{analysis}",
            styles["BodyText"]
        )
    )

    doc.build(story)

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            "attachment; filename=Career_Report.pdf"
        }
    )