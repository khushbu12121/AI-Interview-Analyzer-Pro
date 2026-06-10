import fitz


def extract_text_from_pdf(
    file_path
):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:

        text += page.get_text()

    pdf.close()

    return text