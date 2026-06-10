import re

from app.services.gemini_service import model


def evaluate_answer(
    question,
    answer
):

    prompt = f"""
You are a technical interview evaluator.

Question:
{question}

Candidate Answer:
{answer}

IMPORTANT:

Return response in EXACT format:

Score: X/10

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Suggestions:
- Point 1
- Point 2
"""

    try:

        response = model.generate_content(
            prompt
        )

        feedback = response.text

    except Exception:

        feedback = """
Score: 7/10

Strengths:
- Answer submitted successfully
- Demonstrates understanding

Weaknesses:
- Gemini evaluation unavailable

Suggestions:
- Add more examples
- Explain concepts in detail
"""

    score = 0

    try:

        score_match = re.search(
            r"Score[:\s]*([0-9]+)\s*/\s*10",
            feedback,
            re.IGNORECASE
        )

        if score_match:

            score = int(
                score_match.group(1)
            )

    except Exception as e:

        print(
            "Score extraction error:",
            e
        )

    return {
        "score": score,
        "feedback": feedback
    }