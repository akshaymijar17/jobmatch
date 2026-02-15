from pdfminer.high_level import extract_text
import requests
from bs4 import BeautifulSoup
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from a PDF file."""
    text = extract_text(io.BytesIO(file_bytes))
    return text

def scrape_job_description(url: str) -> str:
    """Scrapes job description from a LinkedIn URL."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Try to find the main content. This selector might need adjustment.
        # LinkedIn often serves a different page for bots.
        # A common public job view container
        description_div = soup.find("div", class_="description__text") or soup.find("div", class_="show-more-less-html__markup")
        
        if description_div:
            return description_div.get_text(strip=True)
        
        # Fallback: return whole body text if specific container not found

        return soup.body.get_text(strip=True) if soup.body else ""
        
    except requests.exceptions.RequestException as e:
        print(f"Error scraping {url}: {e}")
        return ""


from google import genai
import os
import json

def analyze_job_match(resume_text: str, job_description: str) -> dict:
    """Analyzes the match between a resume and a job description using Gemini."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "match_score": 0,
            "analysis": "Gemini API Key not found. Please set GEMINI_API_KEY in .env file.",
            "company_analysis": "N/A"
        }

    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert recruiter and career coach. Analyze the following resume against the job description.

    Resume:
    {resume_text[:4000]}... (truncated if too long)
    
    Job Description:
    {job_description[:4000]}... (truncated if too long)
    
    Output a JSON object with the following keys:
    - match_score: An integer from 0 to 100 representing the match percentage.
    - job_title: The job title from the job description.
    - company: The company name from the job description.
    - location: The location of the job.
    - job_type: The type of job (e.g., "Hybrid", "Remote", "On-site", "Full-time").
    - key_strengths: A list of 3-5 strings highlighting the candidate's specific strengths relevant to this role.
    - experience_gaps: A list of 3-5 strings listing specific missing skills or experience gaps.
    - pro_tip: A single, actionable "Pro Tip" for the candidate to improve their chances (e.g. "Include specific metrics...").
    - company_analysis: A 2-3 sentence analysis of what the company does and how the candidate fits their mission.
    - recommended_edits: A list of objects, each with "type" (either "add" or "adjust") and "suggestion" (string describing the edit). Provide 2-3 high-impact edits.
    - analysis: A brief summary of the overall fit (2-3 sentences).
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config={
                'response_mime_type': 'application/json'
            }
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "match_score": 0,
            "job_title": "N/A",
            "company": "N/A",
            "location": "N/A",
            "job_type": "N/A",
            "key_strengths": [],
            "experience_gaps": ["Error during analysis"],
            "pro_tip": "Check API configuration.",
            "company_analysis": "N/A",
            "recommended_edits": [],
            "analysis": f"Error during analysis: {str(e)}"
        }

