from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

# Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

load_dotenv()

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; strict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    job_url: str

import shutil
from backend.utils import extract_text_from_pdf, scrape_job_description, analyze_job_match

@app.post("/analyze")
@limiter.limit("1/minute")
async def analyze_job(request: Request, job_url: str = Form(...), resume: UploadFile = File(...)):
    # 1. Read Resume
    if resume.content_type != "application/pdf":
        return {"error": "Only PDF files are supported"}
    
    resume_bytes = await resume.read()
    resume_text = extract_text_from_pdf(resume_bytes)
    
    # 2. Scrape Job Description
    job_description = scrape_job_description(job_url)
    if not job_description:
         return {"error": "Could not scrape job description from URL"}

    # 3. Analyze with LLM
    result = analyze_job_match(resume_text, job_description)
    
    return {
        "filename": resume.filename,
        "job_url": job_url,
        "match_score": result.get("match_score"),
        "job_title": result.get("job_title"),
        "company": result.get("company"),
        "location": result.get("location"),
        "job_type": result.get("job_type"),
        "key_strengths": result.get("key_strengths"),
        "experience_gaps": result.get("experience_gaps"),
        "pro_tip": result.get("pro_tip"),
        "recommended_edits": result.get("recommended_edits"),
        "analysis": result.get("analysis"),
        "company_analysis": result.get("company_analysis")
    }

# Mount static files (built React app)
# This must come AFTER all API routes are defined
if os.path.exists("static"):
    # Catch-all route to serve React app - must be defined BEFORE mounting static files
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Don't catch API routes or static assets
        if full_path.startswith("analyze") or full_path.startswith("docs") or full_path.startswith("openapi") or full_path.startswith("static"):
            return {"error": "Not found"}
        # Serve index.html for all other paths (including root "/")
        return FileResponse("static/index.html")
    
    # Mount static assets at /static
    app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
